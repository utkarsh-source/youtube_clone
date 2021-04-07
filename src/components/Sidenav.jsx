import React from 'react'
import { FaHome, FaFire, FaClone, FaBoxes } from 'react-icons/fa'
import './sidenav.css'

function Sidenav() {
    return (
            <nav id='nav'>
                <ul>
                    <li><a href="#">
                        <FaHome className='home' />
                        <span>Home</span>
                    </a>
                    </li>
                    <li><a href="#">
                        <FaFire className="trend"></FaFire>
                        <span>Trending</span>
                    </a></li>
                    <li><a href="#">
                        <FaBoxes className="subs"></FaBoxes>
                        <span>Subscription</span>
                    </a></li>
                    <li><a href="#">
                        <FaClone className="lib"></FaClone>
                        <span>Library</span>
                    </a></li>
                </ul>
            </nav>
    )
}

export default Sidenav
