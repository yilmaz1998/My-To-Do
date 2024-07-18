const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./database")

//middleware
app.use(cors())
app.use(express.json())


//create todo
app.post('/todo', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
            );

            res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todos
app.get('/todo', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a todo
app.get('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id])
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo
app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updatedTodo = await pool.query("UPDATE todo SET description =$1 WHERE id =$2", [description, id])
        res.json("To-do has been updated.")
    } catch (err) {
        console.error(err.message)
    }
})


//delete a todo
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedTodo = await pool.query("DELETE FROM todo WHERE id=$1", [id])
        res.json("To-do has been deleted.")        
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(3000, () => {
    console.log("Server in on 3000")
})