import React, { useState } from "react";
import { Card, Button, Collapse } from 'react-bootstrap';
import Lottie from "lottie-react";
import he from 'he';
import LoadingAnimation from '../assets/images/loading.json';
import ErrorAnimation from '../assets/images/error_info.json';
import '../assets/styles/ExploreUniverse.scss';


export default function ExploreUniverse({ trivia, loading, error }) {

    const [openTrivia, setOpenTrivia] = useState({});

    const loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const errorOptions = {
        loop: false,
        autoplay: true,
        animationData: ErrorAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const toggleTrivia = (id) => {
        setOpenTrivia((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) {
        return (
            <div className="explore-universe-container">
                <h2 className="mb-4 text-center">Explore the Universe</h2>
                <Lottie options={loadingOptions} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="explore-universe-container">
                <h2 className="mb-4 text-center">Explore the Universe</h2>
                <Lottie options={errorOptions} />
                <p className="text-danger text-center mt-2">{error}</p>
            </div>
        );
    }

    if (!trivia || trivia.length === 0) {
        return (
            <div className="explore-universe-container">
                <h2 className="mb-4 text-center">Explore the Universe</h2>
                <p className="text-center">No mission trivia available.</p>
            </div>
        );
    }

    return (
        <div className="explore-universe-container">
            {trivia.map((mission) => (
                <Card key={mission.id} className="explore-card mb-3">
                    <Card.Body>
                        <Card.Title className="text-white d-flex justify-content-between align-items-center">
                            <span>{he.decode(mission.name)}</span>
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() => toggleTrivia(mission.id)}
                                aria-controls={`trivia-${mission.id}`}
                                aria-expanded={openTrivia[mission.id]}
                            >
                                {openTrivia[mission.id] ? "Hide" : "Learn More"}
                            </Button>
                        </Card.Title>
                        <Collapse in={openTrivia[mission.id]}>
                            <div id={`trivia-${mission.id}`}>
                                <Card.Text className="text-white mt-2">
                                    {mission.details ? he.decode(mission.details) : "No additional details available."}
                                </Card.Text>
                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}