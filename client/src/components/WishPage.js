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
  }, [currentUser])

  useEffect(() => {
    fetch('/api/trashes/wanted_by_user')
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                setMatchingTrash(data.map(trash => ({...trash, distance: distance(currentLocation, [trash.longitude, trash.latitude])})))
            })
        }else{
            console.log("ERROR FETCHING WANTED TRASH")
        }
    })
  }, [wishes])
  
  function handleAddToWishlist(wish){
    setWishes([...wishes, wish])
  }


  return (
    currentUser ? 
    <div className='wish-page'>
        <h1 className="page-header">Wishlist</h1>
        <div className="wish-main">
          <div className='wish-blurb-container'>
            <h4 className='subheader'>About the wish page</h4>
            <p className="blurb">
              Add items to your wish list.  If someone tags trash near you it will show up here! The wish granter looks for tags on trash that match items on your wish list so don't be shy with the tags.  Throw out all the words you think someone might tag your coveted trash with.  And don't forget to pay it forward - add tags to trash on the map to make our wish-granting more robust.
            </p>
          </div>
          <div className="wish-page-side">
            <WishForm currentUser={currentUser} handleAddToWishlist={handleAddToWishlist}/>
            <WishList wishes={wishes} />
          </div>
          { matchingTrash.length ? <TrashList trash={matchingTrash} fromWishPage={true}/> : null }
        </div>

    </div> :
    <h1>Loading...</h1>
  )
}
