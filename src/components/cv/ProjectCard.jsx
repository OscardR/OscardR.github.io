import React from 'react';

export const ProjectCard = ({ image, title, description, link }) => (
  <div className="project-card">
    {image && <img src={image} alt={title} />}
    <div className="content">
      <h4>{title}</h4>
      <p>{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      )}
    </div>
  </div>
);
