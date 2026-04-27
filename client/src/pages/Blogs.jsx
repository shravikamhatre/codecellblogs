import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogList from '../components/BlogList'

const Blogs = () => {
  const navigate = useNavigate()

  return <BlogList onBack={() => navigate('/')} />
}

export default Blogs
