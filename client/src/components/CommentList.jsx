import { useState, useEffect } from 'react'

function CommentList({ comments }) {
    
    function renderComments() {
        return comments.map(function({ id, content }) {
            return (
                <li
                    key={id}
                >
                    {content}
                </li>
            )
        })
    }


    return (
        <ul>
            {renderComments()}
        </ul>
    )
}

export default CommentList
