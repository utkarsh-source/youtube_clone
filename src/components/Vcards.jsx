import React, {useRef, useCallback, useEffect, useState, useContext} from 'react'
import './vcard.css'
import { FaCheckCircle, FaCircle } from 'react-icons/fa'
import moment from 'moment'
import numeral from 'numeral'
import api from './Axios'
import {Link, useHistory} from 'react-router-dom'
const Vcards = React.forwardRef(({ channelId, channelTitle, thumbnails, videoId, duration, publishedAt, viewCount, title }, ref) => {
const [ch_url, setch_url] = useState("")
const history = useHistory()
const sec = moment.duration(duration).asSeconds()
const videoDuration = moment.utc(sec * 1000).format('mm:ss')
useEffect(() => {
    (async () => {
        api.get("channels", {
            params: {
                part: 'snippet',
                id: channelId
            }
        }).then(({data}) => setch_url(data.items[0].snippet.thumbnails.medium.url))
        .catch(err => console.log(err.message))
    })()
}, [channelId])

    const clickHandler = useCallback(() => {
    history.push(`/watch/${videoId}`)
    }, [])
return (
    <div id='vcont' onClick={clickHandler} ref={ref}>
            <div id="imageBox">
                <Link className="linktovideo" to={`/watch/${videoId}`}>
                    <img src={thumbnails.medium.url} alt="Thumbnail" />
                </Link>
                <span className="duration"><span>{videoDuration}</span></span>
            </div>
            <div id="ch-cont"> 
                <a href="#"><img src={ch_url} alt="Channel_image"/></a>
                <div className="detail">
                    <h3><a href="#">{title}</a></h3>
                    <div id='ch-box'>
                        <span className="ch-name"><a href="#">{channelTitle}</a> &nbsp; <FaCheckCircle className="v" /></span>
                        <div className='ch-de'>{numeral(viewCount).format("0.a").toUpperCase()} views &nbsp;<FaCircle className="dot" />&nbsp; {moment(publishedAt).fromNow()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Vcards