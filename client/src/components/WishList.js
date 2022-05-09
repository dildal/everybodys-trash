import React from 'react'

export default function WishList({wishes}) {
  const renderWishes = wishes.map(wish => {
       return <div className="wish-item">
          {wish.name}
      </div>
  })
  return (
    <div className='wish-list'>
        {renderWishes}
    </div>
  )
}
