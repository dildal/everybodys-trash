import React, { useState } from 'react'
import TrashListItem from './TrashListItem';
import TrashItemDetail from './TrashItemDetail';


export default function TrashList({
  trash,
  handleRemoveTrash
}) {
    const sortedTrash = trash.sort((a,b) => a.distance - b.distance)
    const [expandedId, setExpandedId] = useState();

    const sortedTrashItems = sortedTrash.map(trash => {
        return expandedId === trash.id ?
         <TrashItemDetail 
          key={trash.id} 
          trash={trash} 
          setExpandedId={setExpandedId}
          handleRemoveTrash={handleRemoveTrash}
        /> :
         <TrashListItem key={trash.id} trash={trash} setExpandedId={setExpandedId}/>
    })
    
  return (
    <div className="trash-list-container">
        {sortedTrashItems}
    </div>
  )
}
