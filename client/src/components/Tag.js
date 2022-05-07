import React from 'react'

export default function Tag({tag, removeTag}) {
  const COLORS = ["#17DEEE", "#FF7F50", "#FF4162", "#F2E50B", "#21B20C"]
  function handleClick(e){
      e.stopPropagation();
      e.preventDefault();
      removeTag(tag);
  }
  return (
    <div className='tag'>
        {removeTag && <button className="tag-button" onClick={(e) => handleClick(e)}>X</button>}
        {tag}
    </div>
  )
}

