import React from 'react';
import './BlogCard.css';

const BlogCard = ({ title, category, date, imageIndex }) => {
  // Using simple minimalist geometric patterns via CSS if no image is provided,
  // or a generated placeholder URL. Since we want an editorial feel, stark black and white works well.
  
  return (
    <article className="blog-card">
      <div className="card-visual">
        {/* Placeholder for editorial minimalist imagery */}
        <div className={`placeholder-image pattern-${imageIndex % 3}`}></div>
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span className="card-category">{category}</span>
          <span className="card-date">{date}</span>
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
    </article>
  );
};

export default BlogCard;
