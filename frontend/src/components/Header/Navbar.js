import './Navbar.css'
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faBars, faLaptopCode} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="navbar">
            <div className='logo'>
                <Link to='/' className='logo-btn'>Go Move.</Link>
            </div>
            <div className='menu-icon' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} size="2x" style={{color: "#90EE90FF"}}/>
            </div>
            <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
                <Link to='/search' className='nav-btn'>
                    <li>Search</li>
                </Link>
                <Link to='/about' className='nav-btn'>
                    <li>About Us</li>
                </Link>
                <Link to='/profile' className='nav-btn'>
                    <li>Profile</li>
                </Link>
                <Link to='/login' className='nav-btn'>
                    <li>Login</li>
                </Link>
                <Link to='/add-activity' className='add-activity-btn'>
                    <li>Add Activity</li>
                </Link>
            </ul>
            <div className={`media ${showMenu ? 'show' : ''}`}>
                <FontAwesomeIcon className='media-btn' icon={faFacebook} size="2x" style={{color: "#2b75f6"}}/>
                <FontAwesomeIcon className='media-btn' icon={faYoutube} size="2x" style={{color: "#fa3333"}}/>
                <FontAwesomeIcon className='media-btn' icon={faLaptopCode} size="2x" style={{color: "#90EE90FF"}}/>
            </div>
        </nav>
    );
}

export default Navbar;