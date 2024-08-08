import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        console.log('Logged out')
      }

  return (
    <nav class="navbar navbar-expand-lg bg-info-subtle">
    <div class="container-md">
      <a class="navbar-brand" href="/">My-To-Do</a>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  </nav>
  )
}

export default Navbar