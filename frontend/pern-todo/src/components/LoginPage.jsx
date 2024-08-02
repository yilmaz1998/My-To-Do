import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/login', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ username, password })
    })


    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      console.log(data)
      navigate('/')
    } else {
      alert('Login failed')
    }
  }
  return (
    <div className='text-center mx-auto p-32'>
      <h1 className='text-4xl mb-4'>Login Page</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Login</button>
       </form>
      <div>
        <p className='mt-4'>If you don't have an account, go to sign up page from the link below.</p>
        <Link class="btn btn-outline-secondary mt-2" to='/signup'>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginPage
