import { useState, useEffect } from 'react'

function applyModerationOnComment(comment, status) {
    switch (status) {
        case 'approved':
            return <b>{comment}</b>
        case 'pending':
            return <span>{comment}</span>
        case 'rejected':
            return <i>This comment is been moderated</i>
    }
}

function CommentList({ comments }) {

    function renderComments() {
        return comments.map(function ({ id, content, status }) {


            return (
                <li
                    key={id}
                >
                    {applyModerationOnComment(content, status)}
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
