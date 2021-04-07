import React, { useEffect, useState } from 'react'
import './sidevideo.css'
import { FaCircle } from 'react-icons/fa'
import moment from 'moment'
import numeral from 'numeral'
import api from './Axios'
import {useHistory} from 'react-router-dom'
function SideVideos({ publishedAt, channelTitle, title, thumbnails, videoId}) {
    const [duration, setDuration] = useState("")
    const [viewCount, setviewCount] = useState("")
    const seconds = moment.duration(duration).asSeconds()
    const videoduration = moment.utc(seconds * 1000).format('mm:ss')
    const history = useHistory()

    const handleClick = () => {
        history.push(`/watch/${videoId}`)
    }
    useEffect(() => {
        api.get("videos", {
            params: {
                part: 'contentDetails,statistics',
                id: videoId,
                type :'video'
            }
        }).then(({ data }) => {
            setDuration(data.items[0]?.contentDetails?.duration)
            setviewCount(data.items[0]?.statistics?.viewCount)
        }).catch(error=>console.log(error))
    }, [videoId])
    return (
        <>
        <div id="vidbox" onClick={handleClick}>
                <div className="imageframe"><img src={thumbnails?.medium.url} alt="" /><div id="duration_box">{videoduration}</div></div>
                    <div id="vidbox_meta_data">
                <h3 className="frametitle">{title}</h3>
                <div className="frame_channel_title">{channelTitle}</div>
                    <div className='frame_views_detail'>{numeral(viewCount).format("0,a")}&nbsp;<FaCircle className="dot" />&nbsp; {moment(publishedAt).fromNow()}</div>
                    </div>
            </div>
            <hr/>
            </>
    )
}

export default SideVideos
