import React from 'react';

export const ExperienceItem = ({ title, position, date, description, children }) => (
  <div className="experience-item">
    <h4>
      {title} | <span>{position}</span>
    </h4>
    <span className="date">{date}</span>
    <h5>{description}</h5>
    {children}
  </div>
);
