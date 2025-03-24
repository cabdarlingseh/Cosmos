import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import LaunchIcon from '../assets/images/RocketLaunchAnimation.json';
import ExplosionIcon from '../assets/images/Explosion.json';
import '../assets/styles/RocketSimulator.scss';
import ReactSlider from "react-slider";


export default function RocketSimulator() {

    const [fuel, setFuel] = useState(0);
    const [angle, setAngle] = useState(0);
    const [launchStatus, setLaunchStatus] = useState(null);
    const [message, setMessage] = useState('');

    const simulateLaunch = () => {
        const earthGravity = 9.8;
        const initialVelocity = fuel * 50;
        const angleRadian = (angle * Math.PI) / 180;
        const timeToPeak = initialVelocity * Math.sin(angleRadian) / earthGravity;
        const maxHeight = (initialVelocity * Math.sin(angleRadian)) ** 2 / (2 * earthGravity);
        const horizontalRange = initialVelocity * Math.cos(angleRadian) * (2 * timeToPeak);

        const minHeight = 100000;
        const minDistance = 10000;
        const maxDistance = 1000000;

        let success = true;
        let failureMessage = '';

        if (maxHeight < minHeight) {
            success = false;
            failureMessage = 'Rocket did not reach the minimum height.';
        }
        else if (horizontalRange < minDistance) {
            success = false;
            failureMessage = 'Rocket did not launch. Adjust your launch angle.';
        }
        else if (horizontalRange > maxDistance) {
            success = false;
            failureMessage = 'Target overshot. Please adjust your launch angle.';
        }

        if (success) {
            setLaunchStatus('success');
            setMessage('Rocket launched successfully!');
        }
        else {
            setLaunchStatus('failure');
            setMessage(failureMessage);
        }
    };

    const resetLaunch = () => {
        setFuel(0);
        setAngle(0);
        setLaunchStatus(null);
        setMessage('');
    };

    return (

        <Container className="rocket-launch-simulator">
            <p>Adjust fuel and trajectory to launch a Falcon 10 into the orbit!</p>

            {!launchStatus && (
                <div className="controls">
                    <Form.Group className="mb-4">
                        <Form.Label>Fuel ({fuel} tons)</Form.Label>
                        <ReactSlider
                            className="custom-slider fuel-slider"
                            thumbClassName="custom-slider-thumb"
                            trackClassName="custom-slider-track"
                            min={0}
                            max={100}
                            value={fuel}
                            onChange={(value) => setFuel(value)}
                            renderThumb={(props, state) => {
                                const { key, ...restProps } = props;
                                return (
                                    <div key={key} {...restProps} className="custom-slider-thumb">
                                        {state.valueNow}
                                    </div>
                                );
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Angle ({angle}°)</Form.Label>
                        <ReactSlider
                            className="custom-slider angle-slider"
                            thumbClassName="custom-slider-thumb"
                            trackClassName="custom-slider-track"
                            min={0}
                            max={90}
                            value={angle}
                            onChange={(value) => setAngle(value)}
                            renderThumb={(props, state) => {
                                const { key, ...restProps } = props;
                                return (
                                    <div key={key} {...restProps} className="custom-slider-thumb">
                                        {state.valueNow}°
                                    </div>
                                );
                            }}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={simulateLaunch}>Launch the Rocket</Button>
                </div>
            )}

            {launchStatus && (
                <div className="result">
                    <Lottie
                        animationData={launchStatus === "success" ? LaunchIcon : ExplosionIcon}
                        loop={true}
                        className="launch-animation"
                    />

                    <p className={`message text-${launchStatus === 'success' ? 'success' : 'failure'}`}>
                        {message}
                    </p>

                    <Button variant="secondary" onClick={resetLaunch}>Reset the Launch</Button>
                </div>
            )}
        </Container>
    )
}