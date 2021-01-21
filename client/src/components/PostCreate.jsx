import { useState } from 'react'
import axios from 'axios'

const url = 'http://localhost:4000/posts'

function PostCreate() {
    const [title, setTitle] = useState('')

    async function onSubmitHandle(event) {
        event.preventDefault()
        
        await axios.post(url, { title })

        setTitle('')
    }

    return (
        <div>
            <h2>Create Posts</h2>
            <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                    <input
                        className="form-control"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate
