import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({currentUser}) {
  const location = useLocation();
  
  console.log(location.pathname)
  return (
    <nav>
        <Link to="/bulletin" className='nav-link'>
            Bulletin Board
        </Link>
        {currentUser && <Link to="/wishlist" className='nav-link'>Wishlist</Link>}
        <Link to="/trash" className="nav-link">Map</Link>
    </nav>
  )
}
