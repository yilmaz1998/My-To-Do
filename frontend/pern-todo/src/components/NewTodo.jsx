import React, { useState } from 'react'
import ShowTodo from './ShowTodo'
import { useNavigate } from 'react-router-dom'

const NewTodo = () => {

  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      setError('Please log in')
      return
    }

    if (description.trim() === '') {
      setError('Description cannot be empty')
      return
    }
    try {
      const response = await fetch('http://localhost:3000/todo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({description})
    })

    window.location = "/todo"
  } catch (err) {
    console.error(err.message)
  }
  }
  
  return (
    <div className='text-center'>
      {token ? (
        <h1 className='mt-2 text-2xl'>Welcome, <span className='text-blue-500'>{username}</span></h1>
      ) : null}
    <h1 className='text-5xl mt-12'>My To-Do List</h1>
    <form className='mt-6' onSubmit={handleSubmit}>
      <input type='text' className="input form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button class="btn btn-primary">Add</button>
    </form>
    {error && <p className="text-red-500 mt-2">{error}</p>}
    <ShowTodo />
    </div>
  )
}

export default NewTodo