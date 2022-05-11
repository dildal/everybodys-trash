import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
export default function NewPostForm({currentUser}) {
  const [post, setPost] = useState({
      title: '',
      body: '',
      user_id: ""
  });
  const history = useHistory();

  function handleSubmit(e){
      e.preventDefault();
      fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({...post, user_id: currentUser.id})
    })
    .then(res => res.json())
    .then(data => {
        if(data.errors){
            console.log(data.errors)
        } else{
            // add modal/popup saying bulletin was posted
            console.log("Success bb: ", data)
            history.push('/bulletin')
        }
    })
  }

  return (
        <div>
        {currentUser ? 
            <form className="big-form" onSubmit={e => handleSubmit(e)}>
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
                <input type='submit' value='Post Bulletin' className='main-button'/>
            </form> :
            <h1>LOADING...</h1>
        }
        </div> 
  )
}
