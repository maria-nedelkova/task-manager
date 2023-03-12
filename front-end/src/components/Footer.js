import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info-container">
        <div id="nav_links">
          <NavLink to="/">My Tasks</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <div id="contact">
          <p>
            <FontAwesomeIcon icon={faMapMarkedAlt} className="footer-icon" />
            Stockholm, Sweden
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            maria.nedelkova90@gmail.com
          </p>
        </div>
      </div>
      <div className="made-by">
        Made by
        <a className="linked-in-link" href="https://www.linkedin.com/in/maria-nedelkova-25497193/" target="_blank" rel="noreferrer">Maria Nedelkova</a>
      </div>
    </footer>
  );
}
