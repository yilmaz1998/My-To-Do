import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/signup', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
  
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      navigate('/login')
    } else {
      alert('Signup failed')
    }
  }
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className='text-center mt-48'
    >
      <h1 className='text-4xl mb-4'>Sign Up Page</h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
       </form>
       <p className='mt-4'>If you have an account, go to log in page from the link below.</p>
       <Link class="btn btn-outline-secondary mt-2" to='/login'>Log In Page</Link>
    </motion.div>
  )
}

export default SignupPage