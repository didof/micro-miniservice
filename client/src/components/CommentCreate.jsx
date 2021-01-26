import { useState } from 'react'
import axios from 'axios'

const url = 'http://posts.com/posts/%ID%/comments'

function CommentCreate({ postId }) {
    const [content, setContent] = useState('')

    async function onSubmitHandle(event) {
        event.preventDefault()

        const specificUrl = url.replace('%ID%', postId)
        
        await axios.post(specificUrl, { content })

        setContent('')
    }

    return (
        <div>
            <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                    <label>New comment:</label>
                    <input
                        className="form-control"
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate
