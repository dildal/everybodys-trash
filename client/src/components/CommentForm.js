import React, { useState } from 'react'

export default function CommentForm({currentUser, post, handleAddComment}) {
  const [newComment, setNewComment] = useState({
      body: '',
      user_id: currentUser.id,
      post_id: post.id
  })

  function handleSubmit(e){
      e.preventDefault();
      fetch('/api/comments', {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(newComment)
      })
      .then(res => res.json())
      .then(data => {
          if(data.errors){
              console.log(data.errors)
          } else {
              setNewComment({...newComment, body: ''})
              handleAddComment(data)
          }
      })
  }
  return (
    <div className="comment-form">
        <form onSubmit={e => handleSubmit(e)}>
            <label htmlFor="comment" style={{marginRight: '5px'}}>
                Comment:
            </label>
            <input 
                type='text'
                id="comment"
                placeholder='Leave a comment'
                name='comment'
                onChange={e => setNewComment({...newComment, body: e.target.value})}
                value={newComment.body}
            />
            <input type="submit" value="Add comment" className="secondary-button" style={{marginLeft: "5px"}}/>
        </form>
    </div>
  )
}
