import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

export default function EditPostForm() {
  const { postId } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({
      title: '',
      body: ''
  })

  useEffect(() => {
      fetch(`/api/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        if(data.errors){
            console.log(data.errors);
        } else {
            setPost({title: data.title, body: data.body})
        }
      })
  }, [])

  function handleSubmit(e){
      e.preventDefault();
      fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })
      .then(res => res.json())
      .then(data => {
          if(data.errors){
              console.log(data.errors)
          } else {
              history.push('/bulletin')
          }
      })
  }

  return (
    <div>
        <form onSubmit={e => handleSubmit(e)} className="big-form">
            <div className="input-container">
                <label htmlFor="title">
                    Title:
                </label>
                <input 
                    type='text'
                    id="title"
                    placeholder='Title ya post'
                    name='title'
                    onChange={e => setPost({...post, title: e.target.value})}
                    value={post.title}
                />
            </div>
            <div className="input-container">
                <label htmlFor='body'>
                    Body:
                </label>
                <textarea
                    name="body" 
                    id="body" 
                    value={post.body}
                    placeholder='Tell me more...'
                    onChange={(e) => setPost({...post, body: e.target.value})}
                />
            </div>
            <input type='submit' value='Submit Edit' className='main-button main-button-large'/>
        </form>
    </div>
  )
}
