import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import '../assets/styles/FeedbackModal.scss';
import Lottie from "lottie-react";
import SuccessAnimation from '../assets/images/success.json';
import FailureAnimation from '../assets/images/failure.json';


export default function FeedbackModal({ show, onHide }) {

    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [errorOccured, setErrorOccured] = useState(false);

    //Form Changes

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeedback((prev) => ({
            ...prev, [name]: value
        }));
    }

    //Form Submission

    const handleFeedbackSubmit = async (event) => {
        event.preventDefault();
        setErrorOccured(false);

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: `Feedback from ${feedback.name}`,
                body: feedback.message,
                userId: feedback.email
            });

            console.log('Submitted Feedback:', response.data);
            setSubmitted(true);

            setFeedback({
                name: '',
                email: '',
                message: ''
            });

            setTimeout(() => {
                setSubmitted(false);
                onHide();
            }, 4000);
        }
        catch (error) {
            console.error('Error submitting feedback:', error);
            setErrorOccured(true);
            setTimeout(() => {
                setErrorOccured(false)
            }, 4000);
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            className="text-white"
        >
            <Modal.Header closeButton className="bg-dark border-0">

                <Modal.Title>Send Feedback</Modal.Title>

            </Modal.Header>

            <Modal.Body className="bg-dark">

                {submitted ? (

                    <div className="feedback-result">
                        <Lottie
                            animationData={SuccessAnimation}
                            loop={false}
                            className='success-animation'
                            aria-labe='Success animation'
                        />
                        <p className="text-success">Thank you! Your feedback has been submitted.</p>
                    </div>

                ) : errorOccured ? (
                    <div className="feedback-result">
                        <Lottie
                            animationData={FailureAnimation}
                            loop={false}
                            className="failure-animation"
                            aria-label="Failure animation"
                        />
                        <p className="text-danger mt-2">Oops! Failed to submit feedback. Try again later.</p>
                    </div>
                )
                    : (
                        <Form onSubmit={handleFeedbackSubmit}>

                            <Form.Group className="mb-3" controlId="feedbackName">

                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={feedback.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Name"
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="feedbackEmail">

                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={feedback.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Email"
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="feedbackMessage">

                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    name="message"
                                    value={feedback.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Feedback"
                                    required
                                />

                            </Form.Group>

                            <div className="feedback_submit_button">
                                <button variant="primary" type="submit" className="btn btn-danger ">Submit Feedback</button>
                            </div>

                        </Form>
                    )
                }

            </Modal.Body >

        </Modal >
    )
}