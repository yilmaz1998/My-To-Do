const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./database")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const PORT = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())



//signup
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await pool.query(
            "INSERT INTO users (username,password) VALUES($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await pool.query(
            "SELECT * FROM users WHERE username = $1", [username])
        if (user.rows.length === 0) {
            return res.status(401).json({ msg: "No username found"})
        }

        const correctPassword = await bcrypt.compare(password, user.rows[0].password)
        if(!correctPassword) {
            return res.status(401).json({ msg: "Wrong Password"})
        }

        const userId = user.rows[0].id
        const token = jwt.sign({ user_id: userId, username: user.rows[0].username }, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.json({ token, username })

    } catch (err) {
        console.error(err.message)
    }
})

//middleware for auth
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization 


  if (!authHeader) {
    console.log("No token found in the auth header:", authHeader)
    return res.status(401).json({ message: "A token is required." })
  }

    const token = authHeader

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (err) {
        console.error(err.message)
    }
}


//create todo
app.post('/todo', authenticate, async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description, user_id) VALUES($1, $2) RETURNING *", 
            [description, req.user.user_id]
            );

            res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todos
app.get('/todo', authenticate, async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo WHERE user_id = $1", [req.user.user_id])
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a todo
app.get('/todo/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const todo = await pool.query("SELECT * FROM todo WHERE id=$1 AND user_id = $2", [id, req.user.user_id])
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo
app.put('/todo/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [description, id, req.user.user_id])
        res.json("To-do has been updated.")
    } catch (err) {
        console.error(err.message)
    }
})


//delete a todo
app.delete('/todo/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const deletedTodo = await pool.query("DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *", [id, req.user.user_id])
        res.json("To-do has been deleted.")        
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server in on ${PORT}`)
})