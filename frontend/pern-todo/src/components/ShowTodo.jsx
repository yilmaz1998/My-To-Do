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
        <div key={todo.id} className='mt-3'>
          <div className='flex flex-col items-center mx-4'>
            <p className='text-3xl break-words overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md'>{todo.description}</p>
            <div className='flex space-x-2 mt-2'>
              <EditTodo todo={todo} fetchTodos={fetchTodos}/>
              <button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowTodo