import React, { useState, useEffect } from 'react'
import EditTodo from './EditTodo'

const ShowTodo = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token")
        }
      })
      const data = await response.json()

      setTodos(data)

    } catch (err) {
      console.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
         method: 'DELETE',
         headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token")
        },
     })
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  return (
    <div className='text-center'>
    {todos.map((todo) => (
      <div key={todo.id}> 
      <div className='d-flex justify-content-center mt-2'>
        <p className='text-3xl'>{todo.description}</p> 
        <EditTodo todo={todo} fetchTodos={fetchTodos}/>
        <button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ShowTodo