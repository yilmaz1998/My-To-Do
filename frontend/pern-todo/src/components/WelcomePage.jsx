import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const WelcomePage = () => {
  return (
    <motion.div
    className='flex flex-col items-center mt-72'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.3 }}
    >
    <motion.h1 
    className='text-4xl mb-2'
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    >
    Welcome to My-To-Do
    </motion.h1>
    <p className="text-lg">Get organized and stay on track. Sign up or log in to start managing your tasks today.</p>
    <div className='flex mt-3'>
    <Link class="btn btn-outline-success" to={'login'}>Login</Link>
    <Link class="btn btn-outline-info ml-2" to={'signup'}>Sign Up</Link>
    </div>
    </motion.div>
  )
}

export default WelcomePage