import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Signup({setCurrentUser}) {
  const history = useHistory();
  const [user, setUser] = useState({
      username: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      city: ''
  })
  const [errors, setErrors] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    if(user.password !== user.confirm_password){
        setErrors([...errors, "Passwords don't match"])
        return
    }
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if(data.errors){
            setErrors(data.errors)
        }else {
            setCurrentUser(data);
            history.push('/');
        }
    })
  }


  return (
    <div style={{width: '60%', margin: '0 auto'}}>
        <h3>Signup</h3>
        {errors.length > 0 && errors.map(err => <h4 className='error'>{err}</h4>)}
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
            <div className="input-container">
                <label htmlFor="confirmPassword">
                    Confirm password:
                </label>
                <input 
                    required
                    type='password'
                    id="confirmPassword"
                    placeholder='confirm password'
                    name='confirmPassword'
                    onChange={e => setUser({...user, confirm_password: e.target.value})}
                    value={user.confirm_password}
                />
            </div>
            <div className="input-container">
                <label htmlFor="firstName">
                    First name:
                </label>
                <input 
                    required
                    type='text'
                    id="firstName"
                    placeholder='First Name'
                    name='firstName'
                    onChange={e => setUser({...user, first_name: e.target.value})}
                    value={user.first_name}
                />
            </div>
            <div className="input-container">
                <label htmlFor="lastName">
                    Last Name:
                </label>
                <input 
                    type='text'
                    id="lastName"
                    placeholder='First Name'
                    name='lastName'
                    onChange={e => setUser({...user, last_name: e.target.value})}
                    value={user.last_name}
                />
            </div>
            <input className='main-button' type='submit' value="Sign Up" />
        </form>
    </div>
  )
}
