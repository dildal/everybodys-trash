import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';

export default function BulletinPost({post, isEditable, handleDelete, setDetailID, isDetailed, currentUser}) {
  const giveClass = post.is_request ? '' : 'giving-away'
  const [comments, setComments] = useState(post.comments);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideCommentForm, setHideCommentForm] = useState(false)

  const location = useLocation();

  function handleAddComment(comment) {
      setComments([...comments, comment])
  }

  function handleEditComment(editComment){
      setComments(comments.map(comment => {
          return comment.id === editComment.id ? editComment : comment
      }))
  }

  function handleDeleteComment(id){
      setComments(comments.filter(comment => comment.id !== id))
  }


  const renderComments = comments.map(comment => {
      return <Comment 
        comment={comment} 
        currentUser={currentUser} 
        handleDeleteComment={handleDeleteComment} 
        handleEditComment={handleEditComment}
        setHideCommentForm={setHideCommentForm}
    />
  })
  return (
    <div className={`bulletin-post ${giveClass}`} onClick={() => setDetailID(post.id)}>
        <p className='post-user'>{post.user.username} 
        {(currentUser && currentUser.id !== post.user.id ) && <Link onClick={e => e.stopPropagation()} to={{
        pathname: `/messages/${post.user.id}`,
        }}>
            Chat
        </Link>}
        </p>
        <h3 className='post-title'>{post.title}</h3>
        {isDetailed && 
            <div className='detailed-post'>
                <p className='post-body'>{post.body}</p>
                <p className='comment-header'>Comments:</p>
                {renderComments}
                {(currentUser && !hideCommentForm) && <CommentForm post={post} currentUser={currentUser} handleAddComment={handleAddComment}/>}
            </div>
        }
        {isEditable && 
            <div className="user-controls">
                <Link to={`posts/${post.id}/edit`} className='main-button'>Edit Post</Link>
                <button className='main-button' onClick={() => handleDelete(post.id)}>Delete Post</button>
            </div>
        }
    </div>
    
  )
}
