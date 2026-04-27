import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
