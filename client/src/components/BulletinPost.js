import React from 'react'
import { Link } from 'react-router-dom'


export default function BulletinPost({post, isEditable}) {
  const giveClass = post.is_request ? '' : 'giving-away'
  return (
    <div className={`bulletin-post ${giveClass}`}>
        <p className='post-user'>{post.user.username}</p>
        <h3 className='post-title'>{post.title}</h3>
        <p className='post-body'>{post.body}</p>
        {isEditable && <Link to={`posts/${post.id}/edit`} className='button-link'>Edit Post</Link>}
    </div>
  )
}
