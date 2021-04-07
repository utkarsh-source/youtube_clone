import React, { useState, useRef}from 'react'
import { FaBars, FaSearch, FaVideo, FaTh, FaBell} from 'react-icons/fa'
import './header.css'
import logo from './tube.png' 
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getSearchVideos } from '../action/videos_request'


const Header = ({ hoverNavRef }) => {
    const [query, setQuery] = useState("")
    const inputElem = useRef()
    let [prevQuery, setprevQuery] = useState('')
    const { profileUrl } = useSelector(state => state.auth.user ? state.auth.user : "")
    const history = useHistory()
    const dispatch = useDispatch()
    const submit = () => {
    if (!query.length) {
      inputElem.current.focus()
      return
    } 
    if (prevQuery != query) {
        setprevQuery(query)
        dispatch(getSearchVideos('','',true))
        history.push(`/search/${query}`)
        }
        
}   
    return (
        <header>
            <div className="logo">
                <FaBars className="bars" onClick={() => hoverNavRef.current.classList.add('transition')}/>
                <img src={logo} alt=""/>
                <h2><span>M</span>adTube</h2>
            </div> 
            <div id="search-box">
                <div className="mainbox">
                    <input ref={inputElem} onKeyDown={(e)=> e.key==="Enter" && submit()} type="text" placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value) }/>
                    <Link  onClick={submit} to={''} className='linkelem'>
                        <FaSearch className="srch" />
                    </Link>
                </div>
            </div>
            <div id="tool">
                <FaVideo className="t"/>
                <FaTh className="t"/>
                <FaBell className="t"/>
            </div>
            <div id="profile">
                <img src={profileUrl} alt="User"/>
            </div>
       </header>
    )
}

export default Header
