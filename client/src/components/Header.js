import React from 'react';
import Logo from '../images/logo.png';
import { Link, useHistory } from 'react-router-dom';

export default function Header({currentUser, setCurrentUser}) {
  const history = useHistory();
  
  function handleLogOut(){
    fetch('/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
            setCurrentUser(null);
            history.push('/');
        } else{
            console.log("Error!")
        }
    })
  }

  return (
    <header>
        <Link to='/'>
            <img src={Logo} style={{height: '72px'}} alt="Everybody's trash logo"/>
        </Link>
            
        <Link to="/bulletin" className='big-header-link'>
            Bulletin Board
        </Link>
        {currentUser && <Link to="/wishlist" className='big-header-link'>Wishlist</Link>}
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
