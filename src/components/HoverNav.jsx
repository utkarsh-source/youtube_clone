import React from 'react'
import './hovernav.css'
import logo from './tube.png'
import {
    FaHome, FaFire, FaYoutubeSquare, FaFileVideo,
    FaHistory, FaPlayCircle, FaClock, FaThumbsUp, FaBars, FaSignOutAlt
} from 'react-icons/fa'
import {useDispatch } from 'react-redux'
import { logout } from '../action/auth'
import { useHistory,Link } from 'react-router-dom'
import styled from 'styled-components'
const styledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`
const HoverNav = React.forwardRef(({hoverNavRef}, ref) => {
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div id='box' ref={ref}>
            <div id="box-logo">
                <FaBars className='icon bar' onClick={()=>hoverNavRef.current.classList.remove('transition')}/>
                <img src={logo} alt=""/>
                <h2><span>M</span>adTube</h2>
            </div>
            <div id="box-wrap" >
            <ul className='features'>
                <li><FaHome className='icon'/> Home</li>
                <li><FaFire className='icon'/>Trending</li>
                <li> <FaYoutubeSquare className='icon'/>Subscription</li>
                <hr/>
                <li><FaFileVideo className='icon'/>Library</li>
                <li> <FaHistory className='icon'/>History</li>
                <li><FaPlayCircle className='icon'/>Your videos</li>
                <li><FaClock className='icon'/>Watch later</li>
                <li><FaThumbsUp className='icon'/> Like videos</li>
                    <li onClick={() => {
                        dispatch(logout())
                    }}><FaSignOutAlt className='icon' /> Logout</li>
            </ul>
                <hr /> 
            </div>
        </div>
        
    )
})
export default HoverNav
