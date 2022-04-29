import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BulletinPost from './BulletinPost';

export default function BulletinBoard({currentUser}) {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => {
        if(data.errors){
            console.log(data.errors);
        } else{
            setPosts(data)
        }
    })
  }, [])

  const postsToRender = posts.map(post => {
      return <BulletinPost post={post} key={post.id} isEditable={currentUser && currentUser.id === post.user.id}/>
  })
  
  return (
    <div className='bulletin-board'>
        {postsToRender}
        {currentUser && <Link to='/posts/new' className='button-link'>New Post</Link>}
    </div>
  )
}
