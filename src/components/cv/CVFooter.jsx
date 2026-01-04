import React from "react";

export const CVFooter = ({ links }) => (
  <footer className="cv-footer">
    <div className="footer-content">
      <div className="social-links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="social-icon"
          >
            <i className={link.icon.join(" ")}></i>&nbsp;{link.title}
          </a>
        ))}
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} Óscar Gómez Alcañiz. All rights reserved.
      </p>
    </div>
  </footer>
);
