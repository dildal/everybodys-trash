import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login({setCurrentUser}) {
  const history = useHistory();
  const [user, setUser] = useState({
      username: '',
      password: ''
  });
  const [errors, setErrors] = useState()

  function handleSubmit(e){
    e.preventDefault(e);
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if(data.errors){
            setErrors(data.errors)
        } else{
            setCurrentUser(data);
            history.push('/trash');
        }
    })
  }

  return (
    <div style={{width: '60%', margin: '0 auto'}}>
        <h3>Login</h3>
        {errors && errors.map(err => <h4 className='big-error'>{err}</h4>)}
        <form className='big-form' onSubmit={e => handleSubmit(e)}>
            <div className="input-container">
                <label htmlFor="username">
                    Username:
                </label>
                <input 
                    required
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
                    required
                    type='password'
                    id="password"
                    placeholder='password'
                    name='password'
                    onChange={e => setUser({...user, password: e.target.value})}
                    value={user.password}
                />
            </div>
            <input type='submit' value='Log in' className='main-button'/>
        </form>
    </div>

  )
}
