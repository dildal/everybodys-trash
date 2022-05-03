import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Comment({comment, currentUser, handleEditComment, handleDeleteComment}) {
  const [toggleEditForm, setToggleEditForm] = useState(false)
  const [editComment, setEditComment] = useState(comment)
  const location = useLocation();

  function handleSubmit(e){
    e.preventDefault()
    fetch(`/comments/${comment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({body: editComment.body})
    })
    .then(res => res.json())
    .then(data => {
      if(data.errors){
        console.log(data.errors)
      } else{
        setToggleEditForm(false)
        handleEditComment(data)
      }
    })
  }

  function handleDeleteClick(){
    fetch(`/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(res => {
      if(res.ok){
        handleDeleteComment(comment.id)
      }else{
        console.log("error when deleting comment");
      }
    })
  }

  return (
    <div className='comment-container'>
      <h4>{comment.user.username}</h4>
      {
      currentUser.id !== comment.user.id &&
        <Link to={{
        pathname: `/messages/${comment.user.id}`,
        state: {modal: location}
        }}>
          Chat
        </Link>
      }
      {toggleEditForm ? 
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="comment">
                Comment:
            </label>
            <input 
                type='text'
                id="comment"
                placeholder='Leave a comment'
                name='comment'
                onChange={e => setEditComment({...editComment, body: e.target.value})}
                value={editComment.body}
            />
            <input type="submit" value="Edit comment" />
      </form>
      :
      <>
        <p>{comment.body}</p>
        {currentUser.id == comment.user.id && 
          <div className='user-controls'>
            <button onClick={() =>setToggleEditForm(true)}>Edit Comment</button>
            <button onClick={handleDeleteClick}>Delete Comment</button>
          </div>
        }
      </>
      
      }
    </div>
  )
}
