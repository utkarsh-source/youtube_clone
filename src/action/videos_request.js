
import api from '../components/Axios'
import { HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, DISCARD_VIDEOS, SHOW_COMMENTS_REQUEST, SHOW_COMMENTS_SUCCESS, SHOW_COMMENTS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_DETAILS_FAIL, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL, RELATED_VIDEOS_REQUEST, RELATED_VIDEOS_SUCCESS, RELATED_VIDEOS_FAIL, DISCARD_RELATED_VIDEOS, DISCARD_COMMENTS } from '../actionType/videos_request'

export const getHomeVideos = (nextPage, clear = false) => {
    if (clear) {
        return async function (dispatch) {
            dispatch({type : DISCARD_VIDEOS})
        }
    }
    return async function (dispatch) {
        try {
            dispatch({type : HOME_VIDEOS_REQUEST})
            const { data } = await api.get('videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    maxResults: 12,
                    pageToken: nextPage,
                    regionCode: 'IN',
                }
            })
            dispatch({
                type: HOME_VIDEOS_SUCCESS,
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken
                }
            })
        }
        catch (error) {
            dispatch({type: HOME_VIDEOS_FAIL, payload : error.message})
        }
    }
}   

export const getSearchVideos = (query, nextPage, clear = false) => {
    if (clear) {
        return async function (dispatch) {
            dispatch({type : DISCARD_VIDEOS})
        }
    }
    return async function (dispatch) {
        dispatch({ type: SEARCH_VIDEO_REQUEST })
        try {
            const { data } = await api.get('search', {
                params: {
                    part: 'snippet',
                    maxResults: 12,
                    pageToken: nextPage,
                    q: query,
                    type : 'video'
                }
            })
            dispatch({
                type: SEARCH_VIDEO_SUCCESS,
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken
                }
            })
        } catch (error) {
            dispatch({ type: SEARCH_VIDEO_FAIL, payload: error.message })
        }
    }
}

export const showComments = (id, nextPage) => {
    return async function (dispatch) {
        dispatch({ type: SHOW_COMMENTS_REQUEST })
        try {
            const {data} = await api.get("commentThreads", {
                params: {
                    part: 'snippet',
                    videoId: id,
                    maxResults: 20,
                    pageToken : nextPage
                }
            })
            dispatch({
                type: SHOW_COMMENTS_SUCCESS,
                payload:
                {
                    comments: data.items,
                    nextPageToken : data.nextPageToken
                }
            })
        } catch (error) {
            dispatch({ type: SHOW_COMMENTS_FAIL, payload: error.message })
        }
    }
}
export const flush_comments = () => {
    return {
        type: DISCARD_COMMENTS,
    }
} 
export const getVideo_details = (id) => {
    return async function (dispatch) {
        dispatch({ type: VIDEO_DETAILS_REQUEST })
        try {
            const {data} = await api.get("videos", {
                params: {
                    part: 'snippet,statistics',
                    id : id
                }
            })
            dispatch({type : VIDEO_DETAILS_SUCCESS, payload : data.items})
        } catch (error) {
            dispatch({type : VIDEO_DETAILS_FAIL, payload : error.message})
        }
    }
}

export const getChannel_details = (channelId) => {
    return async function (dispatch) {
        dispatch({ type: CHANNEL_DETAILS_REQUEST })
        try {
            const {data} = await api.get("channels", {
                params: {
                    part: 'snippet,statistics',
                    id : channelId
                }
            })
            dispatch({type : CHANNEL_DETAILS_SUCCESS, payload : data.items})
        } catch (error) {
            dispatch({type : CHANNEL_DETAILS_FAIL, payload : error.message})
        }
    }
}



export const getRelatedVideos = (id) => {
    return async function (dispatch) {
        dispatch({ type: RELATED_VIDEOS_REQUEST })
        try {
            const {data} = await api.get("search", {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    type: 'video',
                    maxResults : 12
                }
            })
            dispatch({type : RELATED_VIDEOS_SUCCESS, payload : data.items})
        } catch (error) {
            dispatch({type : RELATED_VIDEOS_FAIL, payload : error.message})
        }
    }
}
