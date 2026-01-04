import React from "react";

export const SkillCard = ({ icon, title, description }) => (
  <div className="skill-card">
    <div className="icon">
      {icon.includes("/") ? (
        <img src={icon} alt={title} className="skill-icon-img" />
      ) : (
        <i className={icon}></i>
      )}
    </div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);
