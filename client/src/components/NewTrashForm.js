import React, { useState } from 'react'
import {distance} from '@turf/turf';
import Tag from './Tag';


export default function NewTrashForm({
    latitude, 
    longitude, 
    setAddTrash, 
    setOpenTrashForm, 
    currentLocation,
    interactiveLayerIds,
    setInteractiveLayerIds,
    handleAddTrash
}) {
  const trashInit = {
    title: '',
    picture: '',
    category: '',
    isHeavy: '',
    latitude: latitude,
    longitude: longitude,
    description: '',
    tags: []
  }

  const [newTrash, setNewTrash] = useState(trashInit);

  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([])

  function handleTagAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!tags.some(t => t === newTag)){
        setTags([...tags, newTag]);
    }
    setNewTrash(newTrash => ({...newTrash, tags}))
    setNewTag('');
  }

  function handleExit() {
      setInteractiveLayerIds([...interactiveLayerIds, 'trash-data']);
      setNewTrash(trashInit);
      setAddTrash(false)
      setOpenTrashForm(false);
  }
  

  function handleSubmit(e){
      e.preventDefault();
      console.log(newTrash)
      const formData = new FormData();
      for( const property in newTrash){
          formData.append(property, newTrash[property]);
      }
      fetch('/trashes', {
          method: 'POST',
        //   headers: { 'Content-Type': 'application/json'},
          body: formData
      })
      .then(r => r.json())
      .then(data => {
        if(data.errors){
            console.log(data.errors)
        } else{
           const createdTrash = { ...data , distance: distance(currentLocation, [data.longitude, data.latitude] )}
           setNewTrash(trashInit);
           handleAddTrash(createdTrash)
           setInteractiveLayerIds([...interactiveLayerIds, 'trash-data'])
           setAddTrash(false)
           setOpenTrashForm(false)
        }
      })
  }

  function removeTag(tag){
      setTags(tags.filter(t => t !== tag));
  }

  const renderTags = tags.map((tag, i) => {
     return <Tag tag={tag} key={i} removeTag={removeTag}/>
  })

  return (
    <div className='trash-form-container'>
        <button onClick={handleExit} className='form-close'>X</button>
        <form onSubmit={e => handleSubmit(e)}>
            <div className="input-container">
                <label htmlFor="title" className="light">
                    Title:
                </label>
                <input 
                    type='text'
                    id="title"
                    placeholder='Give the trash a title, just on or two words'
                    name='title'
                    onChange={e => setNewTrash({...newTrash, title: e.target.value})}
                    value={newTrash.title}
                />
            </div>
            <div className="input-container">
                <label htmlFor="picture" className="light">
                    Picture:
                </label>
                <input 
                    type="file" 
                    name="picture" 
                    accept="image/png, image/gif, image/jpeg"
                    id="picture"
                    onChange={e => {setNewTrash(newTrash => ({...newTrash, picture: e.target.files[0]}))}}
                />
            </div>
            <div className="input-container" >
                <label htmlFor='category' className="light">
                    Category:
                </label>
                <select 
                    name="category" 
                    id="category" 
                    value={newTrash.category} 
                    onChange={(e) => setNewTrash({...newTrash, category: e.target.value})}
                    placeholder="Select a category"
                >
                    <option value="" disabled selected hidden>Please Choose...</option>
                    <option value="furniture">Furniture</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="misc">Miscellaneous</option>
                </select>
            </div>
            <div className="input-container" style={{flexDirection: 'row', margin: '0px 7px 0 0'}}>
                <label htmlFor='isHeavy' className="light">
                    Heavy?
                </label>
                <input type="checkbox" 
                    name="isHeavy" 
                    id="isHeavy" 
                    value={newTrash.isHeavy} 
                    onChange={(e) => setNewTrash({...newTrash, isHeavy: e.target.value})}
                    style={{height: '16px', width: '16px'}}
                />
            </div>
            <div className="input-container">
                <label htmlFor='description' className="light">
                    Description
                </label>
                <textarea
                    name="description" 
                    id="description" 
                    value={newTrash.description} 
                    onChange={(e) => setNewTrash({...newTrash, description: e.target.value})}
                />
            </div>
            <div className='input-container'>
                <label htmlFor='tags' className="light">
                    Add Tag:
                </label>
                <input 
                    type='text'
                    id='tags'
                    name='tags'
                    onChange={e => setNewTag(e.target.value)}
                    value={newTag}
                />
                <button onClick={e => handleTagAdd(e)} className='main-button'>Add Tag</button>
                <div className="tag-container">
                    {renderTags}
                </div>              
            </div>
            <div className='input-container big-input'>
                <input type='submit' value='Add Trash' className='main-button'/>
            </div>
        </form>
    </div>
  )
}
