import React, {useState, useEffect}from 'react'
import './getsearchvideos.css'
import numeral from 'numeral'
import moment from 'moment'
import api from './Axios'
import {FaCircle} from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
const  GetSearchVideos =React.forwardRef(({ channelId, channelTitle, thumbnails, videoId, publishedAt, title, description },ref) => {
    const [url, seturl] = useState("")
    const [duration, setduration] = useState("")
    const [viewCount, setviewCount] = useState("")
    const [subscriberCount, setsubscriberCount] = useState("")

    const sec = moment.duration(duration).asSeconds()
    const videoDuration = moment.utc(sec * 1000).format('mm:ss')

    useEffect(() => {
        (async () => {
            api.get("channels", {
                params: {
                    part: 'snippet, statistics',
                    id: channelId,

                }
            }).then(({ data }) => {
                setsubscriberCount(data.items[0].statistics.subscriberCount)
                seturl(data.items[0].snippet.thumbnails.medium.url)
            })
                .catch(err => console.log(err.message))
        })()
    }, [channelId])
    
    useEffect(() => {
        (async () => {
            api.get("videos", {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoId
                }
            }).then(({ data }) => {
                setduration(data.items[0].contentDetails.duration);
                setviewCount(data.items[0].statistics.viewCount);
            })
                .catch(err => console.log(err.message))
        })()
    }, [videoId])
    const history = useHistory()
    const clickhandler = () => {
        history.push(`/watch/${videoId}`)
    }

        return (
            <div className="videoFrame" onClick={clickhandler} ref={ref}>
                <div id="img_box">
                    <img src={thumbnails.medium.url} alt='Thumbnail'></img>
                    <span id="durationBox"><span>{videoDuration}</span></span>
                </div>
                <div className="frame_de">
                    <div id="frame_title">{title}</div>
                    <div id='views_count'>{numeral(viewCount).format("0.a").toUpperCase()} views &nbsp;<FaCircle className="dot" />&nbsp; {moment(publishedAt).fromNow()}</div>
                    <div id="ch_de"> <img src={url} alt="Image" /> <span className='ch_name'>{channelTitle}</span></div>
                    <div id="dis">{description}</div>
                </div>
            </div>
        )
})

export default GetSearchVideos
