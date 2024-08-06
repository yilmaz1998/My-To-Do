import React from "react"
import { Routes, Route } from "react-router-dom"

import NewTodo from "./components/NewTodo"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import WelcomePage from "./components/WelcomePage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/todo" element={<NewTodo />} />
    </Routes>
    </div>
  )
}

export default App
