import React, { useState, useEffect } from 'react'

const ShowTodo = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo')
      const data = await response.json()

      setTodos(data)

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  return (
    <div className='text-center'>
    {todos.map((todo, index) => (
      <p key={index}>{todo.description}</p>
    ))}
  </div>
  )
}

export default ShowTodo