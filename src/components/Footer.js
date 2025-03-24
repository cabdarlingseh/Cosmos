import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRocket, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import '../assets/styles/Footer.scss';

export default function Footer() {

    return (
        <footer className="footer">
            <Container fluid>
                <Row className="py-4">
                    <Col md={4} className="mb-3 mb-md-0">
                        <div className="footer-brand">
                            <FaRocket className="footer-icon" />
                            <span>Space Dashboard</span>
                        </div>
                        <p className="footer-text">
                            Explore the universe from your screen.
                        </p>
                    </Col>

                    <Col md={4} className="mb-3 mb-md-0">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <NavLink to="/" className="footer-link">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/rockets" className="footer-link">
                                    Rockets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/gallery" className="footer-link">
                                    Gallery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/starchart" className="footer-link">
                                    Star Chart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/explore" className="footer-link">
                                    Explore
                                </NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h5 className="footer-heading">Connect</h5>
                        <div className="social-icons">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                                <FaYoutube />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="footer-bottom py-3">
                    <Col className="text-center">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Cabsdarlingseh. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}