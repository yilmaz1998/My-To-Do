import React from "react"
import { Routes, Route } from "react-router-dom"

import NewTodo from "./components/NewTodo"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"

function App() {
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<NewTodo />} />
    </Routes>
    </div>
  )
}

export default App
