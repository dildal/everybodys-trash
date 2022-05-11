import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BulletinPost from './BulletinPost';

export default function BulletinBoard({currentUser}) {
  
  const [posts, setPosts] = useState([]);
  const [detailID, setDetailID] = useState();

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

  function handleDelete(id){
      fetch(`/posts/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
      })
      .then(res => {
          if(res.ok){
              setPosts(posts.filter(post => post.id !== id))
              //add modal saying post was deleted
          } else{
              console.log('error while deleting post');
          }
    })
  }

  const postsToRender = posts.map(post => {
      return (
        <BulletinPost post={post} 
            key={post.id} 
            isEditable={currentUser && currentUser.id === post.user.id}
            handleDelete={handleDelete}
            isDetailed={detailID === post.id}
            setDetailID={setDetailID}
            currentUser={currentUser}
        />
    )
  })
  
  return (
     posts.length ?
      <div className='bulletin-board'>
          {postsToRender}
          {currentUser && <Link to='/posts/new' className='main-button large-button'>New Post</Link>}
      </div>
      :
      <p>LOADING...</p>
  )
}
