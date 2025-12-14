import React from 'react';

export const SkillCard = ({ icon, title, description }) => (
  <div className="skill-card">
    <div className="icon">
      <i className={icon}></i>
    </div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);
