import './Navbar.css'
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faChevronLeft, faLaptopCode, faX} from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "../MobileMenu/MobileMenu";

function Navbar({loggedIn, setLoggedIn, setDisplayLoginForm, handleLogout}) {
    const [displayMedia, setDisplayMedia] = useState(false);
    const [mediaContainerOpen, setMediaContainerOpen] = useState(true);
    const displayMediaTimer = () => {
        setTimeout(() => {
            setDisplayMedia(true);
            setMediaContainerOpen(true);
        }, 5000)
    }

    return (
        <nav className="navbar">
            <div className='logo'>
                <Link to='/' className='logo-btn'>Go Move.</Link>
            </div>
            {<MobileMenu/>}
            <ul className="nav-links">
                <Link to='/search' className='nav-btn'>
                    <li>Search</li>
                </Link>
                <Link to='/about' className='nav-btn'>
                    <li>About Us</li>
                </Link>
                <Link to='/add-activity' className='add-activity-btn'>
                    <li>Add Activity</li>
                </Link>
            </ul>
            <div
                className={`media ${displayMedia ? 'media-displayed' : 'media-undisplayed'}`}>
                {!displayMedia && displayMediaTimer()}
                <div className={`media-container-${mediaContainerOpen ? 'open' : 'closed'}`}>
                    <button className="open-close-media-btn" onClick={() => setMediaContainerOpen(!mediaContainerOpen)}>
                        <FontAwesomeIcon icon={mediaContainerOpen ? faX : faChevronLeft}/></button>
                    <FontAwesomeIcon className='media-btn' icon={faFacebook} size="2x" style={{color: "#2b75f6"}}/>
                    <FontAwesomeIcon className='media-btn' icon={faYoutube} size="2x" style={{color: "#fa3333"}}/>
                    <FontAwesomeIcon className='media-btn' icon={faLaptopCode} size="2x" style={{color: "#90EE90FF"}}/>
                </div>
            </div>
            {loggedIn && <Link to='/profile' className='nav-btn'>
                <li>Profile</li>
            </Link>}
            {!loggedIn && <button className='login-btn' onClick={() => setDisplayLoginForm(true)}>
                Login
            </button>}
            {loggedIn && <button className='login-btn' onClick={() => handleLogout()}>
                Logout
            </button>}
        </nav>
    );
}

export default Navbar;