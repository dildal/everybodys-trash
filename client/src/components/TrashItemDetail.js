import React, { useState } from 'react'
import furniturePic from '../images/furniture.jpg'
import Tag from './Tag'

export default function TrashItemDetail({
    trash, 
    setExpandedId, 
    handleRemoveTrash,
    fromWishPage
}) {
    
    const [picSrc, setPicSrc] = useState(trash.picture);
    const [toggleForm, setToggleForm] = useState(false);
    const [newTag, setNewTag] = useState({
        text: '',
        trash_id: trash.id
    });
    const [tags, setTags] = useState(trash.tags);

    const images = {
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

    function handleSubmit(e){
        e.preventDefault();
        fetch('tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(newTag)
        })
        .then(res => res.json())
        .then(data => {
            setTags(tags => [...tags, data]);
            setNewTag({...newTag, text: ''})
        })
        setToggleForm(false);
    }

    const renderTags = tags.map(tag => {
        return <Tag tag={tag.text} key={tag.id} />
    })

    return (
        <div id="trash-detail">
            <header>
                <h1>{trash.title}</h1>
                <button onClick={() => setExpandedId(null)}>X</button>
            </header>
            <img src={trash.picture} alt={trash.title} onError={() => setPicSrc(images[trash.category])}/>
            <main>
                <p>{trash.description}</p>
                <div className="tag-container">
                    {renderTags}
                    {toggleForm ? 
                        <form onSubmit={e => (handleSubmit(e))}>
                           <label htmlFor='tags'>
                                Add Tag:
                            </label>
                            <input 
                                type='text'
                                id='tags'
                                name='tags'
                                onChange={e => setNewTag({...newTag, text: e.target.value})}
                                value={newTag.text}
                            />
                            <input type='submit' value="Add tag" />
                        </form>
                        :
                        <button onClick={() => setToggleForm(true)}>+</button>
                    }
                </div>
                {trash.isHeavy ? <span>weight icon</span> : <span>feather icon</span>}
                {fromWishPage || <button onClick={handleDelete}>Mark as picked Up</button>}
            </main>
        </div>
    )
}
