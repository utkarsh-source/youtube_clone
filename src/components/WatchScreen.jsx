import React, {useEffect, useRef, useCallback, useState} from 'react'
import { FaThumbsUp, FaThumbsDown, FaCheckCircle, FaCircle } from 'react-icons/fa'
import './watchscreen.css'
import {useParams } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Comment from './Comment'
import {descard_related_videos, flush_comments, getChannel_details, getRelatedVideos, getVideo_details, showComments } from '../action/videos_request'
import {useDispatch, useSelector} from 'react-redux'
import SideVideos from './SideVideos'
function WatchScreen() {
    const [value, setValue] = useState("")
    const [toggledCmnt, setToggled] = useState(false)
    const { videoId } = useParams()
    const dispatch = useDispatch()
    const [video] = useSelector(state => state.videoDetails.videos)
    const channelId = video?.snippet?.channelId
    const channel = useSelector(state => state.channelDetails.videos)
    const { comments, loading, nextPageToken, error} = useSelector(state => state.commentDetails)
    
    const videos = useSelector(state=>state.relatedVideos.videos)
    const dcptbox = useRef()
const date = moment(video?.snippet?.publishedAt).format('MMM DD, YYYY')
const src = `https://www.youtube.com/embed/${videoId}`
useEffect(() => {
        dispatch(getVideo_details(videoId))
        dispatch(showComments(videoId))
    dispatch(getRelatedVideos(videoId))
    }, [videoId])
useEffect(() => {
    dispatch(flush_comments())
    dispatch(getChannel_details(channelId))
}, [channelId])
    const observer = useRef()
    const lastCmnt = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                dispatch(showComments(videoId, nextPageToken))
            }
        }, {threshold : 0.9})
        if(node) observer.current.observe(node)
    }, [nextPageToken])

    return (
        <div id="watch_box">
            <div id="video_box">
                <div id="video_panel">
                    <iframe src={src} frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="video_title">{video?.snippet?.title}</div>
                <div className="video_details">
                    <div id='views'>{video?.statistics?.viewCount} views &nbsp;<FaCircle className="dot" />&nbsp;{date}</div>
                    <div className="likeDislikeBox">
                        <FaThumbsUp id="likebtn" /><span>{numeral(video?.statistics?.likeCount).format('0,a')}</span>
                        <FaThumbsDown id="dislikebtn"/><span>{numeral(video?.statistics?.dislikeCount).format('0,a')}</span>
                    </div>
                </div>
                    <div className="ch_meta_details">
                    <img src={channel?.[0]?.snippet?.thumbnails?.medium.url} alt="ch_image" />
                        <div className="ch_subs_count">
                        <h3>{video?.snippet?.channelTitle}<span><FaCheckCircle /></span></h3>
                        <h5>{channel?.[0]?.statistics?.hiddenSubscriberCount ? "Subsribers Hidden"  : numeral(channel?.[0]?.statistics?.subscriberCount).format('0,a').toUpperCase() + " subscribers"} </h5>
                    </div>
                    <button>Subscribe</button>
                    </div>
                <div ref={dcptbox} className="ch_discription">{video?.snippet?.description}</div>
                <div onClick={() => {
                    setToggled(prev => !prev)
                    dcptbox.current.classList.toggle('active')
                    }
                } id="show_more">{toggledCmnt ? "SHOW LESS" : "SHOW MORE"}</div>
                <div id="side_playlist_responsive">
                    {videos?.map((video, index) => {
                        if (video?.snippet) {
                            return < SideVideos key={video?.id?.videoId} {...video?.snippet} videoId={video?.id?.videoId} />
                        }
                    })}
                </div>
                <div id="cmntCount">{error && comments.length? 'Comments are turned off' :numeral(video?.statistics?.commentCount).format('0,a') + " comments"}</div>
                <div id="input_box">
                    <input type="text" placeholder="Add a public comment..." value={value} onChange={(e)=>setValue(e.target.value)}/>
                    <button>Comment</button>
                </div>
                <div id="cmntCont">
                    {
                        comments?.map((comment, index) => {
                            if (comments.length == index + 1) {
                                return <Comment ref={lastCmnt} key={comment.id}
                                {...comment.snippet.topLevelComment.snippet} />
                            } else {
                                return <Comment key={comment.id}
                                {...comment.snippet.topLevelComment.snippet} />
                            }
                        }
                         )
                    }
                    
                 </div>
            </div>
            <div id="side_playlist">
                {videos?.map((video, index) => {
                    if (video?.snippet) {
                        return < SideVideos key={video?.id?.videoId} {...video?.snippet} videoId={video?.id?.videoId} />
                    }
                })}
            </div>
        </div>
    )
}

export default WatchScreen
