import React from 'react'
import './comment.css'
import moment from 'moment'
const Comment = React.forwardRef(({ authorDisplayName, authorProfileImageUrl, publishedAt, textOriginal }, ref) => {
    return (
        <>
            <div id="cmntbox" ref={ref}>
                <img src={authorProfileImageUrl} alt="Image"/>
            <div id="cmnt_details">
                    <div id="cmnter">{authorDisplayName}<span>{moment(publishedAt).fromNow()}</span></div>
                    <h3>{textOriginal}</h3>
            </div>
            </div>
            <hr/>
        </>
    )
})

export default Comment
