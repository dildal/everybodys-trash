import React from 'react'

export default function TrashListItem({trash, setExpandedId, fromWishPage, flyTo, setPopupInfo}) {
  const {title, distance, description, category, isHeavy, longitude, latitude} = trash
  function handleClick() {
    setExpandedId(trash.id);
    setPopupInfo(trash)
    flyTo([longitude, latitude])
  }
  return (
    <a href="#trash-detail">
      <div className={fromWishPage ? 'wish trash-list-item' : 'trash-list-item'} onClick={handleClick}>
          <div className='trash-list-item-name'>
              <h3>{title}</h3>
          </div>
          <div className='trash-list-item-info'>
              <p className='trash-list-description'>{description}</p>
              <p className='trash-list-distance'>Distance: {distance.toFixed(2)} miles</p>
          </div>
      </div>
    </a>
  )
}
