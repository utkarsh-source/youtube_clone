import auth from '../Firebase' 
import firebase from 'firebase/app'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCESS , LOAD_PROFILE, LOGOUT} from '../actionType/user_auth'
export function login() {
    return async function(dispatch) {
        try {
            dispatch({type : LOGIN_REQUEST})
            const provider = await new firebase.auth.GoogleAuthProvider()
            const authDetails = await auth.signInWithPopup(provider)
            const accessToken = authDetails.credential.accessToken
            const profile = {
                name : authDetails.additionalUserInfo.profile.name,
                profileUrl : authDetails.additionalUserInfo.profile.picture,
            }
            sessionStorage.setItem("token", accessToken)
            sessionStorage.setItem("user", JSON.stringify(profile))
            dispatch({ type: LOGIN_SUCESS, payload: accessToken})
            dispatch({type : LOAD_PROFILE, payload : profile})
        } catch (error) {
            dispatch({type : LOGIN_FAIL, payload : error.message})
        }
    }
}

export function logout() {
    return async function (dispatch){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        await auth.signOut()
        dispatch({ type: LOGOUT })
    }
}