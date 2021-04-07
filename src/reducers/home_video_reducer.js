import {HOME_VIDEOS_SUCCESS, HOME_VIDEOS_REQUEST, HOME_VIDEOS_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, DISCARD_VIDEOS, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_DETAILS_FAIL, SHOW_COMMENTS_REQUEST, SHOW_COMMENTS_SUCCESS, SHOW_COMMENTS_FAIL, RELATED_VIDEOS_REQUEST, RELATED_VIDEOS_SUCCESS, RELATED_VIDEOS_FAIL, DISCARD_RELATED_VIDEOS, DISCARD_COMMENTS } from '../actionType/videos_request'

const initialState = {
    loading: false,
    error: false,
    videos: [],
    nextPageToken: null
}
export const home_video_reducer = (state = initialState, { type, payload}) =>{
    switch (type) {
        case HOME_VIDEOS_REQUEST: 
            return {
                ...state, 
                loading : true
            }
        case HOME_VIDEOS_SUCCESS: 
            return {    
                ...state,
                videos: [...state.videos, ...payload.videos],
                loading: false,
                nextPageToken : payload.nextPageToken
            }
        case HOME_VIDEOS_FAIL: 
            return {
                ...state,
                videos: [],
                error: payload,
                loading: false
            }
        case DISCARD_VIDEOS: 
            return {
                ...state,
                videos: [],
                loading : false
            }
        
        default: 
            return state
    }
}  
const searchVideoState = {
    loading: false,
    error: false, 
    svideos: [], 
    nextPageToken : null
}
export const search_video_reducer = (state = searchVideoState, { type, payload}) =>{
    switch (type) {
        case SEARCH_VIDEO_REQUEST: 
            return {
                ...state, 
                loading : true
            }
        case SEARCH_VIDEO_SUCCESS: 
            return {    
                ...state,
                svideos: [...state.svideos, ...payload.videos],
                loading: false,
                nextPageToken : payload.nextPageToken
            }
        case SEARCH_VIDEO_FAIL: 
            return {
                ...state,
                svideos: [],
                error: payload,
                loading: false
            }
        case DISCARD_VIDEOS: {
            return {
                ...state,
                svideos: [],
                loading : false
            }
        }
        default: 
            return state
    }
} 

const videoDetailsState = {
    loading: false, 
    videos: [],
    error : null
}
export const video_details_reducer = (state = videoDetailsState, {type, payload}) => {
    switch (type) {
        case VIDEO_DETAILS_REQUEST: 
        return {
            ...state,
            loading : true
        }
        case VIDEO_DETAILS_SUCCESS: 
        return {
            ...state,
            videos : payload,
            loading : false
        }
        case VIDEO_DETAILS_FAIL: 
        return {
            ...state,
            videos : [],
            error : payload,
            loading : false
            }
        default:
            return state
    }
}

const channelDetailsState = {
    loading: false, 
    videos: [],
    error : null
}
export const channel_details_reducer = (state = channelDetailsState, {type, payload}) => {
    switch (type) {
        case CHANNEL_DETAILS_REQUEST: 
        return {
            ...state,
            loading : true
        }
        case CHANNEL_DETAILS_SUCCESS: 
        return {
            ...state,
            videos : payload,
            loading : false
        }
        case CHANNEL_DETAILS_FAIL: 
            return {
                ...state,
                videos : [],
                error : payload,
                loading : false
            }
        default: 
            return state
    }
}

const commentState = {
    loading: false,
    comments: [],
    nextPageToken: null,
    error : null,
}

export const comment_reducer = (state = commentState, { type, payload })=>{
    switch (type) {
        case SHOW_COMMENTS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case SHOW_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, ...payload.comments],
                nextPageToken : payload.nextPageToken,
                loading : false
            }
        case SHOW_COMMENTS_FAIL:
            return {
                ...state,
                error : payload,
                loading : false
            }
        case DISCARD_COMMENTS:
            return {
                ...state,
                comments : [],
                loading : false
            }
        default: 
            return state
        
    }
}

const relatedVideoState = {
    loading: false,
    videos: [],
    error : null
}
export const relatedVideosReducer = (state = relatedVideoState, { type, payload })=>{
    switch (type) {
        case RELATED_VIDEOS_REQUEST:
            return {
                ...state, 
                loading : true
            }
        case RELATED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos : payload,
                loading : false
            }
        case RELATED_VIDEOS_FAIL:
            return {
                ...state,
                error: payload,
                videos : [],
                loading : false
            }
        default: 
            return state
    }
}

