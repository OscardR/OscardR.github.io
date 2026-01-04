import React from "react";

export const SkillsetList = ({ skillset, index }) => (
  <section id={`skills-${index}`} className="skills-section">
    <h3>{skillset.title}</h3>
    <div className="skills-container">
      {skillset.skills.map((category) => (
        <div key={category.name} className="skill-category">
          <h4>{category.name}</h4>
          <ul>
            {category.items.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                {item.details && item.details.length > 0 && (
                  <span className="skill-details">
                    : {item.details.join(", ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
