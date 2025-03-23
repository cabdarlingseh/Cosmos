import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import Lottie from "lottie-react";
import LoadingAnimation from '../assets/images/loading.json';
import ErrorAnimation from '../assets/images/error_info.json';
import '../assets/styles/Gallery.scss';


export default function PictureOfTheDay({ picture, loading, error, fullWidth }) {

    const [isFullscreen, setIsFullscreen] = useState(false);

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

    const handleCardClick = (e) => {
        e.stopPropagation();
        setIsFullscreen(!isFullscreen);
    };

    const handleBackdropClick = () => {
        if (isFullscreen) {
            setIsFullscreen(false);
        }
    };

    if (loading) {
        return (
            <div className="apod-container">
                <Lottie options={loadingOptions} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="apod-container">
                <Lottie options={errorOptions} />
                <p className="text-danger text-center mt-2">{error}</p>
            </div>
        );
    }

    if (!picture) {
        return (
            <div className="apod-container">
                <p className="text-center">No picture data available.</p>
            </div>
        )
    }

    return (
        <div className={`apod-container ${fullWidth ? 'full-width' : ''}`} onClick={handleBackdropClick}>

            <Card
                className={`apod-card ${isFullscreen ? "fullscreen" : ""}`}
                onClick={handleCardClick}>

                <Card.Body>
                    {picture.media_type === 'image' ? (
                        <Card.Img
                            variant="top"
                            src={picture.url}
                            alt={picture.title}
                            className="apod-image"
                        />
                    ) : (
                        <div className="apod-video">
                            <iframe
                                src={picture.url}
                                title={picture.title}
                                allowFullScreen
                                className="apod-iframe"
                            />
                        </div>
                    )}

                    <Card.Text className="mt-3">
                        <strong>{picture.title}</strong>
                        <br />
                        {picture.explanation}
                    </Card.Text>

                    <Card.Text className="credit">
                        Date: {picture.date} | Credit: {picture.copyright || 'NASA'}
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}