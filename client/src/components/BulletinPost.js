import React from 'react'

export default function BulletinPost({post}) {
  const giveClass = post.is_request ? '' : 'giving-away'
  return (
    <div className={`bulletin-post ${giveClass}`}>
        <p className='post-user'>{post.user.username}</p>
        <h3 className='post-title'>{post.title}</h3>
        <p className='post-body'>{post.body}</p>
    </div>
  )
}
