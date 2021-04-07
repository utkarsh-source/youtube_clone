import React, { useEffect } from 'react'
import './loginpage.css'
import logo from '../Logos/tube.png'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../action/auth'
import { useHistory } from 'react-router-dom'
function LoginPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {accessToken} = useSelector(state=> state.auth)
    const loginHandler = () => {
        dispatch(login())
    }
    useEffect(() => {
        if (accessToken) {
            history.push('/')
        }
    }, [accessToken, history])
    return (
        <div id="full_size_cont">
            <div id="box_cont">
                <img src={logo} alt="" />
                <h3><span>M</span>adTube</h3>
                <button onClick={loginHandler}>Sign In with Google</button>
                </div>
        </div>
    )
}

export default LoginPage
