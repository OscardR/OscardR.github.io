import React from "react";

export const ExperienceItem = ({
  title,
  position,
  date,
  description,
  skills,
  children,
}) => (
  <div className="experience-item">
    <h4>
      {title} | <span>{position}</span>
    </h4>
    <span className="date">{date}</span>
    <h5>{description}</h5>
    {children}
    {skills && skills.length > 0 && (
      <div className="skills-tags">
        {skills.map((skill, index) => (
          <span key={index} className="badge bg-secondary me-1 mb-1">
            {skill}
          </span>
        ))}
      </div>
    )}
  </div>
);
