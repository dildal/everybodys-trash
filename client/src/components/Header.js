import React from 'react';
import Logo from '../images/logo.png';
import { Link, useHistory } from 'react-router-dom';

export default function Header({currentUser, setCurrentUser, mapHeader, setMessageNotifications, channel}) {
  const history = useHistory();
  
  function handleLogOut(){
    fetch('/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
            setCurrentUser(null);
            channel.unsubscribe();
            setMessageNotifications({})
            history.push('/');
        } else{
            console.log("Error!")
        }
    })
  }

  return (
    <header className="main-header">
        <Link to='/'>
            <img src={Logo} style={{height: '72px'}} alt="Everybody's trash logo"/>
        </Link>
        <div className='map-nav'>
        {mapHeader && <Link to="/bulletin" className='big-header-link'>
            Bulletin Board
        </Link>}
        {(currentUser && mapHeader) && <Link to="/wishlist" className='big-header-link'>Wishlist</Link>}
        </div>
        {/* {mapHeader && <Link to="/bulletin" className='big-header-link'>
            Bulletin Board
        </Link>}
        {(currentUser && mapHeader) && <Link to="/wishlist" className='big-header-link'>Wishlist</Link>} */}
        {currentUser ?
            <div className='header-right'>
                <p>Welcome, <em>{currentUser.first_name}</em>!</p>
                <button className='button-link' onClick={handleLogOut}>Log out</button>
            </div>
         :
            <div className='header-right'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
            </div>
        }
    </header>
  )
}
