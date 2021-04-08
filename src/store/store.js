import { createStore, applyMiddleware, combineReducers} from 'redux' 
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authreducer } from '../reducers/authreducer'
import { channel_details_reducer, comment_reducer, home_video_reducer, relatedVideosReducer, search_video_reducer, video_details_reducer } from '../reducers/home_video_reducer'

const rootreducer = combineReducers({
    auth: authreducer,
    videos: home_video_reducer,
    searchVideos: search_video_reducer,
    videoDetails: video_details_reducer,
    channelDetails: channel_details_reducer,
    commentDetails: comment_reducer,
    relatedVideos : relatedVideosReducer
})
const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)))

export default store