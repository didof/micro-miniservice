import { useState, useEffect } from 'react'
import axios from 'axios'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const url = 'http://posts.com/posts'

function PostList() {
    const [posts, setPosts] = useState({})

    async function fetchPosts() {
        const response = await axios.get(url)
        
        setPosts(response.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    function renderPosts() {
        return Object.values(posts).map(function ({ id, title, comments }, index) {
            return (
                <div
                    className="card"
                    style={{ width: '30%', marginBottom: 20 }}
                    key={id}
                >
                    <div className="card-body">
                        <h3>{title}</h3>
                        <CommentList comments={comments} />
                        <CommentCreate postId={id} />
                    </div>
                </div>
            )
        })
    }

    console.log(posts)

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts()}
        </div>
    )
}

export default PostList
