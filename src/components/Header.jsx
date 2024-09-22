// src/components/Header.jsx
import React from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import Support from '../assets/Support.svg'
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
            <img src={ClubIcon} alt="icon" />
                <i className="fa fa-university"></i>
                ClubCon
            </div>
            <nav>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Review</a></li>
                    <li><a href="#">Support <img src={Support} alt="support" /></a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
