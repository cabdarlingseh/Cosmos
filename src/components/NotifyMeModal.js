import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../assets/styles/NotifyMeModal.scss';

export default function NotifyMeModal({ show, onHide, launch, onScheduled }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const launchTime = new Date(launch.net).getTime();
        const now = Date.now();
        const timeUntilLaunch = launchTime - now;
        const tenMinutes = 10 * 60 * 1000;

        if (timeUntilLaunch <= tenMinutes) {
            setStatus('Launch is too soon or has passed.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: `Notification Request for ${launch.name}`,
                body: `Notify ${email} 10 minutes before launch at ${launch.net}`,
                userId: email
            });

            //Notification from the browser

            if ("Notification" in window && Notification.permission === 'granted') {
                setTimeout(() => {
                    new Notification(`Launch Alert: ${launch.name}`, {
                        body: `Launching in 10 minutes from ${launch.pad.location.name}!`,
                        icon: launch.image || '/favicon.ico',
                    });
                }, timeUntilLaunch - tenMinutes);
            }

            setStatus('Notification scheduled! You’ll be emailed.');
            onScheduled();
            setTimeout(() => {
                setStatus('');
                onHide();
            }, 2000);
        } catch (error) {
            console.error('Error scheduling notification:', error);
            setStatus('Failed to schedule notification. Try again.');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered className="text-white">
            <Modal.Header closeButton className="bg-dark border-0">
                <Modal.Title>Schedule Notification for {launch.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="notifyEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>
                    {status && (
                        <p className={`text-${status.includes('Failed') ? 'danger' : 'success'} mb-3`}>
                            {status}
                        </p>
                    )}
                    <Button variant="primary" type="submit">
                        Schedule Notification
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}