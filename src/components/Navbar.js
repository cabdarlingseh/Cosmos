import React, { useEffect, useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { NavLink, useLocation } from "react-router-dom";
import { FaRocket, FaMoon, FaSun } from "react-icons/fa";
import FeedbackModal from '../components/FeedbackModal';
import '../assets/styles/Navbar.scss';

export default function Navbar() {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();


    // Theme changer

    useEffect(() => {
        document.body.classList.remove('theme-dark', 'theme-mars', 'theme-starchart');
        if (location.pathname === '/starchart') {
            document.body.classList.add('theme-starchart');
        } else {
            document.body.classList.add(`theme-${theme}`);
        }
    }, [theme, location.pathname]);

    const themeToggle = (selectedTheme) => {
        document.body.classList.remove(`theme-${theme}`);
        setTheme(selectedTheme);
        document.body.classList.add(`theme-${selectedTheme}`);
        localStorage.setItem('theme', selectedTheme);
        setExpanded(false);
    };

    const handleToggle = () => {
        setExpanded(!expanded);
    };


    const handleNavLinkClick = () => {
        setExpanded(false);
    };

    const handleFeedbackClick = () => {
        setShowFeedbackModal(true);
        setExpanded(false);
    };

    return (
        <BootstrapNavbar expand="lg" variant="dark" className="navbar-custom py-3 fixed-top" expanded={expanded} onToggle={handleToggle}>

            <BootstrapNavbar.Brand as={NavLink} to="/" className="d-flex align-items-center ms-3">
                <FaRocket className="me-2" />
                <span>Space Dashboard</span>
            </BootstrapNavbar.Brand>

            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/rockets"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Rockets
                    </NavLink>

                    <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
                        Gallery
                    </NavLink>

                    <NavLink
                        to="/starchart"
                        className={window.location.pathname === '/starchart' ? 'nav-link active' : 'nav-link'}
                        onClick={handleNavLinkClick}
                    >
                        Star Chart
                    </NavLink>

                    <NavLink
                        to="/cosmic"
                        className={window.location.pathname === '/cosmic' ? 'nav-link active' : 'nav-link'}
                        onClick={handleNavLinkClick}
                    >
                        Cosmic Obeserver
                    </NavLink>
                </Nav>

                <Nav className="ms-auto me-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="theme-dropdown" aria-label="Toggle theme">
                            {theme === 'dark' ? <FaMoon /> : <FaSun />} Theme
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => themeToggle('dark')}>
                                <FaMoon className="me-2" /> Dark
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => themeToggle('mars')}>
                                <FaRocket className="me-2" /> Mars
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        variant="outline-light"
                        className="ms-3"
                        aria-label="Submit Feedback"
                        onClick={handleFeedbackClick}
                    >
                        Submit Feedback
                    </Button>

                </Nav>

            </BootstrapNavbar.Collapse>

            <FeedbackModal
                show={showFeedbackModal}
                onHide={() => setShowFeedbackModal(false)}
            />

        </BootstrapNavbar>
    );
}