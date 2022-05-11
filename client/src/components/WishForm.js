import React, {useState} from 'react'

export default function WishForm({currentUser, handleAddToWishlist}) {
    
  const [newWish, setNewWish] = useState({
    name: "",
    category: ''
  })
  
  function handleSubmit(e){
    e.preventDefault();
    fetch('/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...newWish, user_id: currentUser.id})
    }).then(res => {
        if(res.ok){
            res.json().then(wish => handleAddToWishlist(wish))
        }else{
            // Show error message
            res.json().then(error => console.log(error.errors))
        }
    })
  }

  return (
    <>
        <form className="wish-form" onSubmit={e => handleSubmit(e)}>
            <h4 className='subheader'>Add Items To Your WishList</h4>
            <label htmlFor="wish">
                What are you looking for?
            </label>
            <input 
                type="text"
                id="wish"
                onChange={e => setNewWish({...newWish, name: e.target.value})}
                value={newWish.name}
            />
            <select 
                name="category" 
                id="category" 
                value={newWish.category} 
                onChange={(e) => setNewWish({...newWish, category: e.target.value})}
                placeholder="Select a category"
            >
                <option value="" disabled selected hidden>Choose cateogy...</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="misc">Miscellaneous</option>
            </select>
            <input type="submit" value="Add to wishlist"/>
        </form>
    </> 
  )
}
