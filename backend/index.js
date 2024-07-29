const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./database")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

        const token = jwt.sign({ user_id: user.rows[0].id }, "jwtSecret", {expiresIn: "1h"})
        res.json({ token })

    } catch (err) {
        console.error(err.message)
    }
})

//middleware for auth
const authenticate = (req, res, next) => {
    const token = req.header("token")
    if (!token) {
        return res.status(401).json({ msg: "A token is required."})
    }
    try {
        const decoded = jwt.verify(token, "jwtSecret")
        req.user = decoded
        next()

    } catch (err) {
        console.error(err.message)
    }
}


//create todo
app.post('/todo',  async (req, res) => {
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