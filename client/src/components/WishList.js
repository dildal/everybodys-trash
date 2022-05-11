import React from 'react'

export default function WishList({wishes}) {
  const renderWishes = wishes.map(wish => {
       return <li className="wish-item">
          {wish.name}
      </li>
  })
  return (
    <div className='wish-list'>
        <h4 className="subheader">Your Wishlist</h4>
        <ul> {renderWishes}</ul>
    </div>
  )
}
