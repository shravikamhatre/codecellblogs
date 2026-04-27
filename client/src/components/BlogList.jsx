import React from 'react';
import BlogCard from './BlogCard';
import './BlogList.css';

const DUMMY_BLOGS = [
  { id: 1, title: 'The Architecture of Nothingness', category: 'Design', date: 'Oct 12, 2026' },
  { id: 2, title: 'Memory Leaks & Mental Models', category: 'Engineering', date: 'Oct 05, 2026' },
  { id: 3, title: 'Typography as an API', category: 'Creative Coding', date: 'Sep 28, 2026' },
  { id: 4, title: 'State Machines in the Wild', category: 'Engineering', date: 'Sep 15, 2026' },
  { id: 5, title: 'Grid Systems for the Post-Screen Era', category: 'Design', date: 'Sep 02, 2026' },
  { id: 6, title: 'Abstract Syntax Trees as Art', category: 'Creative Coding', date: 'Aug 21, 2026' },
];

const BlogList = ({ onBack }) => {
  return (
    <div className="blog-list-container container">
      <header className="blog-header">
        <button className="back-btn" onClick={onBack}>
          <span className="back-arrow">←</span> Home
        </button>
        <h1 className="blog-title">Curated Entries</h1>
      </header>
      
      <div className="blog-grid">
        {DUMMY_BLOGS.map((blog, idx) => (
          <BlogCard 
            key={blog.id} 
            title={blog.title} 
            category={blog.category} 
            date={blog.date} 
            imageIndex={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
