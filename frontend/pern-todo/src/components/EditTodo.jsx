import React, { useState } from 'react'

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description)

  const updateDescription = async (e) => {
    try {
      e.preventDefault()
      const body = { description }
      const response = await fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      
      window.location = "/"
    } catch (error) {
      console.error(error.meesage)
    }
  }
  return (
    <div>

<button type="button" class="btn btn-success ml-2" data-bs-toggle="modal" data-bs-target={`#id${todo.id}`}>
  Edit
</button>

<div class="modal fade" id={`id${todo.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit To-Do</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setDescription(todo.description)}></button>
      </div>
      <div class="modal-body">
      <input type='text' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div class="modal-footer">
        <button type="button" onClick={() => setDescription(todo.description)} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={(e) => updateDescription(e)} class="btn btn-primary">Edit</button>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default EditTodo