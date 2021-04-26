import React, {useRef, useEffect, useCallback} from 'react'
import './recomended.css'
import Vcards from './Vcards'
import {useSelector, useDispatch} from 'react-redux'
import { getHomeVideos } from '../action/videos_request' 




function Recomended() {
    const { videos, loading , nextPageToken} = useSelector(state => state.videos)
    const observer = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHomeVideos(null, true))
        dispatch(getHomeVideos())
     }, [])
    const lastElem = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                dispatch(getHomeVideos(nextPageToken))
            }
        }, {threshold : 0.9})
        if(node) observer.current.observe(node)
    }, [nextPageToken])
    
   
    return (
        <main>
            {
                videos.map((video, index) => {
                    if (videos.length - 1 == index) {
                        return <Vcards ref={lastElem}
                            key={video.id}
                            {...video.snippet}
                            videoId={video.id}
                            duration={video.contentDetails.duration}
                            viewCount={video.statistics.viewCount}
                        />
                    } else
                    {
                        return <Vcards 
                            key={video.id}
                            {...video.snippet}
                            videoId={video.id}
                            duration={video.contentDetails.duration}
                            viewCount={video.statistics.viewCount}
                        />
                    }
                        
                })
                }
        </main>
    )
}
export default Recomended