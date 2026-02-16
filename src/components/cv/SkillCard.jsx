import React from "react";

export const SkillCard = ({ icon, title, url, description = "" }) => (
  <div className="skill-card">
    <a href={url || "#"}>
      <div className="icon">
        {icon.includes("/") ? (
          <img src={icon} alt={title} className="skill-icon-img" />
        ) : (
          <i className={icon}></i>
        )}
      </div>
      <h4>{title}</h4>
      <p>{description || ""}</p>
    </a>
  </div>
);
