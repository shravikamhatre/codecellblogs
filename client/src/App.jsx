import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
