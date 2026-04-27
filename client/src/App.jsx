import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Requests from './pages/admin/Requests'
import './App.css'

const PublicLayout = () => (
  <>
    <Nav />
    <main className="app-main">
      <Outlet />
    </main>
  </>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Admin — two pages only */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
