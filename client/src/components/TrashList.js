import React, {useState} from 'react'
import TrashListItem from './TrashListItem';


export default function TrashList({trash}) {
    const sortedTrash = trash.sort((a,b) => a.distance - b.distance)
    const sortedTrashItems = sortedTrash.map(trash => {
        return <TrashListItem key={trash.id} trash={trash} />
    })
    
  return (
    <div className="trash-list-container">
        <h1>Trash List</h1>
        {sortedTrashItems}
    </div>
  )
}
