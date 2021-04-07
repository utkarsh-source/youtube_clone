import React, {useCallback, useEffect, useState, useRef} from 'react'
import './searchresult.css'
import { FaSlidersH } from 'react-icons/fa'
import GetSearchVideos from './GetSearchVideos'
import {useParams} from 'react-router-dom'
import { getSearchVideos } from '../action/videos_request'
import { useSelector, useDispatch } from 'react-redux'
function SearchResult() {
    const elem = useRef()
    const dispatch = useDispatch()
    const {nextPageToken, svideos, loading} = useSelector(state=> state.searchVideos)
    const { queryParam } = useParams()
    useEffect(() => {
        dispatch(getSearchVideos(queryParam))
    }, [queryParam])
    const observer = useRef()
    const lastSearchedVideo = useCallback((node) => {
        if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    dispatch(getSearchVideos(queryParam, nextPageToken))
                }
            }, { threshold: 0.9 })
            if (node) observer.current.observe(node)
    }, [nextPageToken])

    return (
            <div id="main_cont">
        <div id="toggle-filter">
                    <div id='flt-icon' onClick={()=>elem.current.classList.toggle('toggle')}><FaSlidersH className='filterbtn'/> <span>FILTER</span> </div>
                <div id='filter-items'>
                    <ul className="filters">
                    <h2>UPLOAD DATE</h2>
                    <hr/>
                        <li>Last hour</li>
                        <li>Today</li>
                        <li>This week</li>
                        <li>This Month</li>
                        <li>This year</li>
                    </ul>
                    <ul className="filters">
                        <h2>TYPE</h2>
                    <hr/>
                        <li>Video</li>
                        <li>Channel</li>
                        <li>Playlist</li>
                        <li>Show</li>
                        <li>Movie</li>
                    </ul>
                    <ul className="filters">
                        <h2>DURATION</h2>
                    <hr/>
                        <li>Short ( 4 minutes)</li>
                        <li>Long ( 20 minutes)</li>
                    </ul>
                    <ul className="filters">
                        <h2>FEATURES</h2>
                    <hr/>
                        <li>Live </li>
                        <li>4K</li>
                        <li>HD</li>
                        <li>Subtitles</li>
                        <li>Creative Commons</li>
                        <li>360 <sup>.</sup></li>
                        <li>VR180 </li>
                        <li>3D</li>
                        <li>HDR</li>
                        <li>Location</li>
                        <li>Purchased</li>
                    </ul>
                    <ul className="filters">
                        <h2>SORT BY</h2>
                    <hr/>
                        <li>Relavance</li>
                        <li>Upload Date</li>
                        <li>View Count</li>
                        <li>Rating</li>
                    </ul>
            </div>
            </div>
                <div id="srch-res" ref={elem}>
                    <hr />
                    {
                        svideos?.map((video, index) => {
                            if (svideos.length == index + 1) {
                                return <GetSearchVideos ref={lastSearchedVideo} key={video.id.videoId} {...video.snippet}
                        videoId={video.id.videoId}/>
                            } else {
                                return <GetSearchVideos key={video.id.videoId} {...video.snippet}
                        videoId={video.id.videoId}/>
                        }
                        })
                    }
                </div>
                </div>
    )
}

export default SearchResult
                
