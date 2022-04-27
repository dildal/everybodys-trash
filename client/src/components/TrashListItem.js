import React from 'react'

export default function TrashListItem({trash}) {
  const {title, distance, description, category, isHeavy} = trash
  return (
    <div className='trash-list-item'>
        <div className='trash-list-item-name'>
            <h3>{title}</h3>
        </div>
        <div className='trash-list-item-info'>
            <p className='trash-list-description'>{description}</p>
            <p className='trash-list-distance'>Distance: {distance.toFixed(2)} miles</p>
        </div>
    </div>
  )
}
