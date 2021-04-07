import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCESS, LOGOUT } from "../actionType/user_auth"

const initialState = {
    accessToken: sessionStorage.getItem('token') ? sessionStorage.getItem('token')  : null,
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))  : null, 
    loading: false,
}
export const authreducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGIN_REQUEST: 
            return {
                ...state,
                loading : true
            }
        case LOGIN_SUCESS: 
            return {
                ...state,
                accessToken: payload,
                loading : false
            }
        case LOGIN_FAIL: 
            return {
                ...state,
                accessToken : null,
                loading: false, 
                error : payload
            }
        case LOAD_PROFILE: 
            return {
                ...state,
                user: payload
            }
        case LOGOUT: 
            return {
                user: null,
                accessToken: null,
                loading : false,
            }
        default: 
            return state
    }
}