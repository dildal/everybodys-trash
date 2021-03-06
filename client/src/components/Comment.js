import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';


export default function Comment({comment, currentUser, handleEditComment, handleDeleteComment, setHideCommentForm}) {
  const [toggleEditForm, setToggleEditForm] = useState(false)
  const [editComment, setEditComment] = useState(comment)
  const location = useLocation();

  function handleSubmit(e){
    e.preventDefault()
    fetch(`/api/comments/${comment.id}`, {
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
        setHideCommentForm(false);
        handleEditComment(data)
      }
    })
  }

  function handleDeleteClick(){
    fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(res => {
      if(res.ok){
        handleDeleteComment(comment.id)
      }else{
        console.log("error when deleting comment");
      }
    })
  }

  function handleToggles(){
    setToggleEditForm(true);
    setHideCommentForm(true);
  }

  return (
    <div className='comment-container'>
      <h4>{comment.user.username} 
      {
     (currentUser && currentUser.id !== comment.user.id) &&
        <Link to={`/messages/${comment.user.id}`} className="chat-link">
          <FontAwesomeIcon icon={faMessage}/>
        </Link>
      }
      </h4>
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
        {(currentUser && currentUser.id === comment.user.id) && 
          <div className='user-controls'>
            <button className='secondary-button' onClick={handleToggles}>Edit Comment</button>
            <button className='secondary-button' onClick={handleDeleteClick}>Delete Comment</button>
          </div>
        }
      </>
      
      }
    </div>
  )
}
