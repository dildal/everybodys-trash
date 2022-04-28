import React, { useState } from 'react'
import {distance} from '@turf/turf';


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
    description: ''
  }

  const [newTrash, setNewTrash] = useState(trashInit)

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([])

  function handleTagAdd() {
    console.log('in handle tag add')
    setTags([...tags, tag]);
    setTag('');
  }

  function handleEnterPressInTagForm(e){
      console.log(e.key)
  }

  function handleExit() {
      setInteractiveLayerIds([...interactiveLayerIds, 'trash-data']);
      setNewTrash(trashInit);
      setAddTrash(false)
      setOpenTrashForm(false);
  }
  

  function handleSubmit(e){
      e.preventDefault();
      fetch('/trashes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(newTrash)
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

  return (
    <div className='trash-form-container'>
        <button onClick={handleExit} className='form-close'>X</button>
        <form onSubmit={e => handleSubmit(e)}>
            <div className="input-container">
                <label htmlFor="title">
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
                <label htmlFor="picture">
                    Picture:
                </label>
                <input 
                    type="file" 
                    name="picture" 
                    accept="image/png, image/gif, image/jpeg"
                    id="picture"
                    onChange={e => setNewTrash({...newTrash, picture: e.target.value})}
                    value={newTrash.picture}
                />
            </div>
            <div className="input-container">
                <label htmlFor='category'>
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
                <label htmlFor='isHeavy'>
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
                <label htmlFor='description'>
                    Description
                </label>
                <textarea
                    name="description" 
                    id="description" 
                    value={newTrash.description} 
                    onChange={(e) => setNewTrash({...newTrash, description: e.target.value})}
                />
            </div>
            <div className='tags-section'>
                <label htmlFor='tags'>
                    Add Tag:
                </label>
                <input 
                    type='text'
                    id='tags'
                    name='tags'
                    onChange={e => setTag(e.target.value)}
                    value={tag}
                    onKeyDown={e => handleEnterPressInTagForm(e)}
                />
                <button onClick={handleTagAdd}>Add Tag</button>
            </div>
            
            <input type='submit' value='Add Trash'/>
        </form>
    </div>
  )
}