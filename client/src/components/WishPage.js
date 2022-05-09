import React, {useEffect, useState} from 'react'
import WishForm from './WishForm'
import WishList from './WishList'
import TrashList from './TrashList';
import { distance } from '@turf/turf';

export default function WishPage({currentUser, currentLocation}) {
  const [wishes, setWishes] = useState([]);
  const [matchingTrash, setMatchingTrash] = useState([]);

  useEffect(() => {
    currentUser && setWishes(currentUser.wishes);
    fetch('/trashes/wanted_by_user')
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                setMatchingTrash(data.map(trash => ({...trash, distance: distance(currentLocation, [trash.longitude, trash.latitude])})))
            })
        }else{
            console.log("ERROR FETCHING WANTED TRASH")
        }
    })
  }, [currentUser])
  
  function handleAddToWishlist(wish){
    setWishes([...wishes, wish])
  }


  return (
    currentUser ? 
    <div className='wish-page'>
        <h1>{currentUser.first_name}'s Wishlist</h1>
        <WishForm currentUser={currentUser} handleAddToWishlist={handleAddToWishlist}/>
        <WishList wishes={wishes} />
        { matchingTrash.length && <TrashList trash={matchingTrash} fromWishPage={true}/> }
    </div> :
    <h1>Loading...</h1>
  )
}
