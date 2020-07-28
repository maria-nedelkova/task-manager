import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const Footer = () => {
    return (
        <footer className="footer">
            <div id="nav_links">
                <NavLink to="/">My Tasks</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
            <div id="contact">
                <p><FontAwesomeIcon icon={faMapMarkedAlt} className="footer-icon"/>Stockholm, Sweden</p>
                <p><FontAwesomeIcon icon={faPhoneAlt} className="footer-icon"/>+00777257</p>
                <p><FontAwesomeIcon icon={faEnvelope} className="footer-icon"/>taskmanager@live.com</p>
            </div>
        </footer>
    );
}