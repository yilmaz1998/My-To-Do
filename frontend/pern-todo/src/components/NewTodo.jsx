import React, { useState } from 'react'

const NewTodo = () => {

  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/todo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({description})
    })

    window.location = "/"
  } catch (err) {
    console.error(err.message)
  }
  }
  
  return (
    <div className='text-center'>
    <h1 className='text-3xl mt-12'>My To-Do List</h1>
    <form className='mt-6' onSubmit={handleSubmit}>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
    </div>
  )
}

export default NewTodo