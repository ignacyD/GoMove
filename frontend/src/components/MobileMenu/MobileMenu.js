import React, {useState} from "react";
import './MobileMenu.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronUp, faLaptopCode, faX} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons";

function MobileMenu() {
    const [showMenu, setShowMenu] = useState(false);

    return (<div>
        <div className='menu-icon' onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={showMenu ? faChevronUp : faBars} size="2x" style={{color: "#90EE90FF"}}/>
        </div>
        <div className="mobile-menu-space">
            <div className={`mobile-menu-${showMenu ? 'open' : 'closed'}`}>
                <div className={`nav-links-mobile`}>
                    <Link to='/search' className='nav-btn-mobile'>
                        Search
                    </Link>
                    <Link to='/about' className='nav-btn-mobile'>
                        About Us
                    </Link>
                    <Link to='/add-activity' className='add-activity-btn'>
                        Add Activity
                    </Link>
                </div>
                <div className="media-mobile">
                    <a><FontAwesomeIcon className='media-btn' icon={faFacebook} size="2x"
                                        style={{color: "#2b75f6"}}/></a>
                    <a><FontAwesomeIcon className='media-btn' icon={faYoutube} size="2x"
                                        style={{color: "#fa3333"}}/></a>
                    <a><FontAwesomeIcon className='media-btn' icon={faLaptopCode} size="2x"
                                        style={{color: "#90EE90FF"}}/></a>
                </div>
            </div>
        </div>
    </div>)
}

export default MobileMenu;
