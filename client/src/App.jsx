import React from 'react'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

function App() {
    return (
        <div className="container">
            <h1>Micro-miniservice</h1>
            <PostCreate />
            <PostList />
        </div>
    )
}

export default App
