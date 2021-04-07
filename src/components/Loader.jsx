import React, { useRef }from 'react'
import './loader.css'

function Loader() {
  
    return (
        <div id="container">
      <div id="videoFrame" ></div>
      <div id="detail">
        <div id="ch-im"></div>
        <div id="ch-de">
          <div id="ContentFrame"></div>
          <div id="titleFrame"></div>
        </div>
      </div>
    </div>
    )
}

export default Loader
