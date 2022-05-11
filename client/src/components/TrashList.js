import React, { useState } from 'react'
import TrashListItem from './TrashListItem';
import TrashItemDetail from './TrashItemDetail';


export default function TrashList({
  trash,
  handleRemoveTrash,
  fromWishPage = false
}) {
    const sortedTrash = trash.sort((a,b) => a.distance - b.distance)
    const [expandedId, setExpandedId] = useState();

    const sortedTrashItems = sortedTrash.map(trash => {
        return expandedId === trash.id ?
         <TrashItemDetail 
          key={trash.id} 
          trash={trash} 
          setExpandedId={setExpandedId}
          fromWishPage={fromWishPage}
          handleRemoveTrash={handleRemoveTrash}
        /> :
         <TrashListItem key={trash.id} trash={trash} setExpandedId={setExpandedId} fromWishPage={fromWishPage}/>
    })
    
  return (
    <div className={fromWishPage ? "wish-page-trash-list-container" : "trash-list-container"}>
        {fromWishPage && <h4 className="subheader">Is This The Trash You Were Looking For?</h4>}
        {sortedTrashItems}
    </div>
  )
}
