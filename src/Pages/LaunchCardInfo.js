import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { formatCountdown } from "../Utils/Formatter";
import { FaRocket } from "react-icons/fa";
import NotifyMeModal from '../components/NotifyMeModal';
import '../assets/styles/LaunchCardInfo.scss';


export default function LaunchCardInfo({ launch }) {

    const [countdown, setCountdown] = useState('');
    const [notificationSet, setNotificationSet] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    //Countdown Update

    useEffect(() => {
        const updateCountdown = () => {
            setCountdown(formatCountdown(launch.net));
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [launch.net]);


    //Notify Me button

    const handleNotifyMeClick = () => {
        if (notificationSet || countdown === 'Launched') return;
        setShowNotifyModal(true);
    };

    const handleNotificationScheduled = () => {
        setNotificationSet(true);
        setStatusMessage('Notification scheduled successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    const handleCardClick = () => {
        setShowDetailsModal(true);
    };

    return (

        <>
            <Card className="launch-card" onClick={handleCardClick} role="button" tabIndex={0}>
                {launch.image ? (
                    <Card.Img
                        variant="top"
                        src={launch.image}
                        alt={`Image of ${launch.name} launch`}
                        className="launch-image"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="launch-image-fallback">
                        <FaRocket size={100} color="#00d4ff" />
                    </div>
                )}
                <Card.Body>
                    <Card.Title className="trimmed_heading">
                        {launch.name || 'Unknown Launch'}
                        <Badge bg={countdown === 'Launched' ? 'success' : 'info'} className="ms-2">
                            {countdown}
                        </Badge>
                    </Card.Title>
                    <Card.Text>
                        <strong>Launch Site:</strong> {launch.pad?.location?.name || 'N/A'}<br />
                        <strong>Provider:</strong> {launch.launch_service_provider?.name || 'N/A'}<br />
                        <strong>Mission:</strong> {launch.mission?.description || 'No mission details available.'}
                    </Card.Text>
                    {statusMessage && (
                        <p className={`text-${notificationSet ? 'success' : 'danger'} mt-2`}>
                            {statusMessage}
                        </p>
                    )}
                    <Button
                        variant={notificationSet ? 'success' : 'primary'}
                        onClick={(e) => { e.stopPropagation(); handleNotifyMeClick(); }}
                        disabled={notificationSet || countdown === 'Launched'}
                        aria-label={notificationSet ? 'Notification scheduled' : 'Schedule launch notification'}
                    >
                        {notificationSet ? 'Notification Set' : 'Notify Me'}
                    </Button>
                </Card.Body>
            </Card>


            <Modal
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                centered
                size="xl"
                className="launch-details-modal text-white"
            >
                <Modal.Header closeButton className="bg-dark border-0">
                    <Modal.Title>{launch.name || 'Unknown Launch'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {launch.image ? (
                        <img
                            src={launch.image}
                            alt={`Image of ${launch.name} launch`}
                            className="modal-launch-image mb-3"
                        />
                    ) : (
                        <div className="modal-launch-image-fallback mb-3">
                            <FaRocket size={150} color="#00d4ff" />
                        </div>
                    )}
                    <h5>Countdown: <Badge bg={countdown === 'Launched' ? 'success' : 'info'}>{countdown}</Badge></h5>
                    <p><strong>Launch Site:</strong> {launch.pad?.location?.name || 'N/A'}</p>
                    <p><strong>Provider:</strong> {launch.launch_service_provider?.name || 'N/A'}</p>
                    <p><strong>Mission:</strong> {launch.mission?.description || 'No mission details available.'}</p>
                    <Button
                        variant={notificationSet ? 'success' : 'primary'}
                        onClick={handleNotifyMeClick}
                        disabled={notificationSet || countdown === 'Launched'}
                        aria-label={notificationSet ? 'Notification scheduled' : 'Schedule launch notification'}
                    >
                        {notificationSet ? 'Notification Set' : 'Notify Me'}
                    </Button>
                </Modal.Body>
            </Modal>

            <NotifyMeModal
                show={showNotifyModal}
                onHide={() => setShowNotifyModal(false)}
                launch={launch}
                onScheduled={handleNotificationScheduled}
            />
        </>
    )
}