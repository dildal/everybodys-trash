import React, { useState } from 'react'
import furniturePic from '../images/furniture.jpg'
import Tag from './Tag'

export default function TrashItemDetail({
    trash, 
    setExpandedId, 
    handleRemoveTrash
}) {
    
    const [picSrc, setPicSrc] = useState(trash.picture)

    const images ={
        furniture: furniturePic
    }

    function handleDelete() {
        fetch(`/trashes/${trash.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        })
        .then(res => {
            if(res.ok){
                handleRemoveTrash(trash.id)
                setExpandedId(null);
            }
        })
    }

    const renderTags = trash.tags.map(tag => {
        console.log("rendering tag ", tag)
        return <Tag tag={tag.text} key={tag.id} />
    })

    return (
        <div id="trash-detail">
            <header>
                <h1>{trash.title}</h1>
                <button onClick={() => setExpandedId(null)}>X</button>
            </header>
            <img src={picSrc} alt={trash.title} onError={() => setPicSrc(images[trash.category])}/>
            <main>
                <p>{trash.description}</p>
                <div className="tag-container">
                    {renderTags}
                </div>
                {trash.isHeavy ? <span>weight icon</span> : <span>feather icon</span>}
                <button onClick={handleDelete}>Mark as picked Up</button>
            </main>
        </div>
    )
}
