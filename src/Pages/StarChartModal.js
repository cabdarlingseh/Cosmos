import React, { useState, useRef } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Lottie from "lottie-react";
import Loading_icon from '../assets/images/loading.json';
import Error_icon from '../assets/images/error_info.json';
import constellations from '../data/constellations.json';
import '../assets/styles/Pages.scss';

const TIMEOUT_DURATION = 10000;

export default function StarChartModal() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [date, setDate] = useState('');
    const [style, setStyle] = useState('default');
    const [constellation, setConstellation] = useState('');
    const [starChartUrl, setStarChartUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [constellationsInput, setConstellationsInput] = useState('');
    const [constellationsSuggestions, setConstellationsSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const suggestionsRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setStarChartUrl(null);

        const apiCall = {
            style: style,
            observer: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                date: date || new Date().toISOString().split('T')[0],
            },
            view: {
                type: constellation ? 'constellation' : 'area',
                parameters: constellation ? { constellation } : {}
            }
        };

        try {
            const response = await axios.post(
                'https://api.astronomyapi.com/api/v2/studio/star-chart',
                apiCall,
                {
                    headers: {
                        'Authorization': `Basic ${process.env.REACT_APP_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: TIMEOUT_DURATION
                }
            );
            setStarChartUrl(response.data.data.imageUrl);
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.');
            } else {
                setError('Failed to generate star chart. Please check your inputs and try again.');
                console.error('Error:', err.response ? err.response.data : err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setLatitude('');
        setLongitude('');
        setDate('');
        setStyle('default');
        setConstellation('');
        setStarChartUrl(null);
        setError('');
    };

    const retrySubmit = () => {
        handleSubmit({ preventDefault: () => { } });
    };

    const handleConstellationsInputChange = (e) => {
        const value = e.target.value;
        setConstellationsInput(value);

        if (value) {
            const filteredConstellations = constellations.filter(constellation =>
                typeof constellation.name === 'string' &&
                constellation.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setConstellationsSuggestions(filteredConstellations.map(c => c.name));
        } else {
            setConstellationsSuggestions([]);
        }
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (constellationsSuggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex((prevIndex) =>
                    prevIndex < constellationsSuggestions.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : constellationsSuggestions.length - 1
                );
            } else if (e.key === 'Enter' && highlightedIndex !== -1) {
                e.preventDefault();
                const selectedConstellation = constellationsSuggestions[highlightedIndex];
                setConstellationsInput(selectedConstellation);
                setConstellation(selectedConstellation);
                setConstellationsSuggestions([]);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setConstellationsInput(suggestion);
        setConstellation(suggestion);
        setConstellationsSuggestions([]);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setConstellationsSuggestions([]);
        }, 200);
    };

    // Loading State
    if (loading) {
        return (
            <Container className="text-center content-container">
                <p className="mt-3">Generating Star Chart...</p>
                <Lottie
                    animationData={Loading_icon}
                    loop={true}
                    className="loading_icon"
                    aria-label="Loading animation"
                />
            </Container>
        );
    }

    // Error State (timeout or failure)
    if (error) {
        return (
            <Container className="text-center content-container">
                <p className="mt-3 error_message">{error}</p>
                <div className="button-group mt-3">
                    <Button
                        variant="primary"
                        onClick={retrySubmit}
                        className="me-2"
                    >
                        Try Again
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={resetForm}
                    >
                        Go Back and Edit
                    </Button>
                </div>
                <Lottie
                    animationData={Error_icon}
                    loop={false}
                    className="error_icon"
                    aria-label="Error animation"
                />
            </Container>
        );
    }

    // Success State
    if (starChartUrl) {
        return (
            <Container fluid className="content-container p-0">
                <div className="star-chart-fullpage">
                    <img
                        src={starChartUrl}
                        alt="Generated Star Chart"
                        className="star-chart-image"
                    />
                    <div className="button-group">
                        <Button
                            variant="secondary"
                            onClick={resetForm}
                            className="me-2"
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="primary"
                            onClick={retrySubmit}
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    // Form State
    return (
        <Container className="content-container star-chart-form">
            <h1 className="main_heading mb-4">Create a Star Chart</h1>
            <Form onSubmit={handleSubmit} className="star-chart-form">
                <Form.Group className="mb-3" controlId="latitude">
                    <Form.Label>Latitude (-90 to 90)</Form.Label>
                    <Form.Control
                        type="number"
                        step="any"
                        min="-90"
                        max="90"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="e.g., 33.775867"
                        required
                        onClick={(e) => e.target.select()}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="longitude">
                    <Form.Label>Longitude (-180 to 180)</Form.Label>
                    <Form.Control
                        type="number"
                        step="any"
                        min="-180"
                        max="180"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="e.g., -84.39733"
                        required
                        onClick={(e) => e.target.select()}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date (Optional)</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Select a date"
                        onClick={(e) => e.target.focus()}
                    />
                    <Form.Text className="text-muted">
                        Defaults to today if not specified
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="style">
                    <Form.Label>Style</Form.Label>
                    <Form.Select value={style} onChange={(e) => setStyle(e.target.value)} onClick={(e) => e.target.focus()} >
                        <option value="default">Default</option>
                        <option value="navy">Navy</option>
                        <option value="red">Red</option>
                        <option value="inverted">Inverted</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 constellation-input-box" controlId="constellation">
                    <Form.Label>Constellation (Optional)</Form.Label>
                    <Form.Control
                        type="text"
                        value={constellationsInput}
                        onChange={handleConstellationsInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleInputBlur}
                        placeholder="Type a constellation name..."
                    />
                    {constellationsSuggestions.length > 0 && (
                        <ul className="suggestions-list" ref={suggestionsRef}>
                            {constellationsSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className={index === highlightedIndex ? 'highlighted' : ''}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    <Form.Text className="text-muted">
                        Select a constellation or "None" for a general area view
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading} className="end-button">
                    {loading ? <Spinner size="sm" animation="border" /> : 'Generate Star Chart'}
                </Button>
            </Form>
        </Container>
    );
}