import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons'

export const Navbar = () => {
    const [dropDownVisible, setDropDownVisibility] = useState(false)
    const topNavClassName = dropDownVisible ? 'navbar-dark clearfix' : 'navbar clearfix'
    const dropDownClassName = dropDownVisible ? 'dropdown-menu-visible' : 'dropdown-menu-hidden'
    const barClassName = dropDownVisible ? 'bar-container bar-to-x' : 'bar-container'
  
    const handleMenuClick = () => {
      dropDownVisible ? setDropDownVisibility(false) : setDropDownVisibility(true)
    }

    const handleMyTaskClick = () => {
        setTimeout(() => {
            dropDownVisible ? setDropDownVisibility(false) : setDropDownVisibility(true)
        }, 500)
    }
  
    return (
        <div className={topNavClassName}>
            <div className="logo">
                <FontAwesomeIcon icon={faEarlybirds} />Task Manager
            </div>
            <div className={barClassName} onClick={handleMenuClick.bind(null)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div className={dropDownClassName}>
                <NavLink to="/about" onClick={handleMenuClick.bind(null)}>About</NavLink>
                <NavLink to="/" onClick={handleMyTaskClick.bind(null)}>My Tasks</NavLink>
            </div>
        </div>
    );
}