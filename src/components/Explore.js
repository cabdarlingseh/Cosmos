import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ViewFromSpace from "../Pages/SpaceView";
import News from '../Pages/SpaceNewsFeed';
import "../assets/styles/Explore.scss";
import Lottie from "lottie-react";
import LoadingAnimation from '../assets/images/loading.json';
import ErrorAnimation from '../assets/images/error_info.json';

export default function CosmicObserver() {
    const componentsToRender = [
        { Component: ViewFromSpace, name: "View from Space" },
        { Component: News, name: "News" },
    ];

    const [pageStatus, setPageStatus] = useState("loading");

    useEffect(() => {

        const timer = setTimeout(() => {
            setPageStatus("ready");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (pageStatus === "loading") {
        return (
            <Container fluid className="py-5 content-container cosmic-observer">
                <Row className="justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <Col md={12} className="text-center">
                        <Lottie
                            animationData={LoadingAnimation}
                            loop={true}
                            className="loading_icon"
                            style={{ height: "200px" }}
                            aria-label="Loading animation"
                        />
                        <p className="mt-3">Loading...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (pageStatus === "error") {
        return (
            <Container fluid className="py-5 content-container cosmic-observer">
                <Row className="justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <Col md={12} className="text-center">
                        <Lottie
                            animationData={ErrorAnimation}
                            loop={true}
                            className="error_icon"
                            style={{ height: "200px" }}
                            aria-label="Error animation"
                        />
                        <p className="mt-3">Failed to load Page. Please try refreshing the page.</p>
                        <Button
                            variant="primary"
                            className="mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }


    return (
        <Container fluid className="py-5 content-container cosmic-observer">
            <Row>
                {componentsToRender.map(({ Component, name }, index) => (
                    <Col md={12} className="mb-4" key={index}>
                        <h2 className="mb-4 main_heading">{name}</h2>
                        <Component />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}