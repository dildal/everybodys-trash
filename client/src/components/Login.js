import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login({setCurrentUser}) {
  const history = useHistory();
  const [user, setUser] = useState({
      username: '',
      password: ''
  })

  function handleSubmit(e){
    e.preventDefault(e);
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if(data.errors){
            console.log(data.errors)
        } else{
            setCurrentUser(data);
            history.push('/');
        }
    })
  }

  return (
    <div style={{width: '60%', margin: '0 auto'}}>
        <h3>Login</h3>
        <form onSubmit={e => handleSubmit(e)}>
            <div className="input-container">
                <label htmlFor="username">
                    Username:
                </label>
                <input 
                    type='text'
                    id="username"
                    placeholder='username'
                    name='title'
                    onChange={e => setUser({...user, username: e.target.value})}
                    value={user.username}
                />
            </div>
            <div className="input-container">
                <label htmlFor="password">
                    Password:
                </label>
                <input 
                    type='password'
                    id="password"
                    placeholder='password'
                    name='password'
                    onChange={e => setUser({...user, password: e.target.value})}
                    value={user.password}
                />
            </div>
            <input type='submit' value='Log in' />
        </form>
    </div>

  )
}
