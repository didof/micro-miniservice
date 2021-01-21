import { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'http://localhost:4001/posts/%ID%/comments'

function CommentList({ postId }) {
    const [comments, setComments] = useState([])

    async function fetchPosts() {
        const specificUrl = url.replace('%ID%', postId)

        const response = await axios.get(specificUrl)

        setComments(response.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

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
