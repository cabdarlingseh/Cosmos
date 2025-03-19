import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Lottie from "lottie-react";
import Loading_icon from '../assets/images/loading.json';
import Error_icon from '../assets/images/error_info.json';
import constellations from '../data/constellations.json';
import '../assets/styles/Pages.scss';

export default function StarChartModal({ show, onHide }) {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [date, setDate] = useState('');
    const [style, setStyle] = useState('default');
    const [constellation, setConstellation] = useState('');
    const [starChartUrl, setStarChartUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timedOut, setTimedOut] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setStarChartUrl(null);
        setTimedOut(false);

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
                        'Authorization': 'Basic MjQ4M2YxZDAtZjMyZC00YWFlLThhMTgtMGU4MzlkYzMwNTIxOjZmMDI3NTlkMzY2NWRkYzE5MGVhYmFiMTIyYTg2ZTlkYTM2OTcyNTQ2NzI1ZmE0NTI4NTFhMjk2Njk0YTJjYWZmMGZlMzY3NWM1Nzk0MDdiZmJhMjE0ZTBjZTlhMDQwYTU1NDI3ZDU0NGZlNzMyNzc5NjVkMzRhZjlhZTIxZWIwYjFiOWVjNzFlOWI2YjY5OWUzM2Y0ZThkYmI4ZmVmMWVjZDg0NDJjYTJhYjkxMjk3NDg2YzJmZmYxZDFmMDMxMGUzZTAwNmY0ZGFhZWJmNWY5MzkwZjU2ZTlmYmZlZDRm',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 seconds timeout
                }
            );
            setStarChartUrl(response.data.data.imageUrl);
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                setTimedOut(true);
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
        setTimedOut(false);
    };

    const retrySubmit = () => {
        handleSubmit({ preventDefault: () => { } });
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
                <Lottie
                    animationData={Error_icon}
                    loop={false}
                    className="error_icon"
                    aria-label="Error animation"
                />
                <Button
                    variant="primary"
                    onClick={timedOut ? retrySubmit : resetForm}
                    className="mt-3"
                >
                    {timedOut ? 'Try Again' : 'Go Back and Edit'}
                </Button>
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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="latitude">
                    <Form.Label>Latitude (-90 to 90)</Form.Label>
                    <Form.Control
                        type="number"
                        step="any"
                        min="-90"
                        max="90"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="e.g., 40.7128"
                        required
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
                        placeholder="e.g., -74.0060"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date (Optional)</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Select a date"
                    />
                    <Form.Text className="text-muted">
                        Defaults to today if not specified
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="style">
                    <Form.Label>Style</Form.Label>
                    <Form.Select value={style} onChange={(e) => setStyle(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="navy">Navy</option>
                        <option value="red">Red</option>
                        <option value="inverted">Inverted</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="constellation">
                    <Form.Label>Constellation (Optional)</Form.Label>
                    <Form.Select
                        value={constellation}
                        onChange={(e) => setConstellation(e.target.value)}
                    >
                        {constellations.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Select a constellation or "None" for a general area view
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Generate Star Chart'}
                </Button>
            </Form>
        </Container>
    );
}