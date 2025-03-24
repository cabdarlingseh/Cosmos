import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/Cosmic.scss";
import EarthImage from "../assets/images/iss_earth.jpg";
import { nasa_API } from "../hooks/UseDataFetcher";

export default function ViewFromSpace() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [earthImage, setEarthImage] = useState(EarthImage);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);



    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const fetchEarthImage = async () => {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000);
                const response = await fetch(
                    `https://api.nasa.gov/EPIC/api/natural?api_key=${nasa_API}`,
                    { signal: controller.signal }
                );
                clearTimeout(timeout);
                if (!response.ok) throw new Error("Failed to fetch EPIC data");
                const data = await response.json();
                const latestImage = data[0];
                const date = new Date(latestImage.date);
                const year = date.getUTCFullYear();
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const day = String(date.getUTCDate()).padStart(2, "0");
                const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${latestImage.image}.png`;
                setEarthImage(imageUrl);
                setLoading(false);
            } catch (err) {
                setError("Could not load Earth image from NASA EPIC API. Please retry again.");
                setEarthImage(EarthImage);
                setLoading(false);
                console.error("EPIC API Error:", err);
            }
        };

        fetchEarthImage();

        return () => {
            clearInterval(timeInterval);
        };
    }, []);
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="view-from-space">
            <Card className="space-view-card">
                <Card.Body>
                    <Card.Title>View from Space</Card.Title>
                    <div className="earth-view">
                        {loading ? (
                            <div className="text-center">Loading Earth image...</div>
                        ) : (
                            <img
                                src={earthImage}
                                alt={error ? "Fallback Earth image" : "Earth from EPIC camera"}
                                className={`earth-image ${isFullscreen ? "fullscreen" : ""}`}
                                onClick={toggleFullscreen}
                            />
                        )}
                    </div>
                    <Card.Text>
                        Current Time: {currentTime.toLocaleString()}
                        <br />
                        {error ? error : "Latest image of Earth from NASA's EPIC camera on the DSCOVR satellite."}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}