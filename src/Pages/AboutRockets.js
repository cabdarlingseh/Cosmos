import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useDashboardData from '../hooks/UseDataFetcher';
import LaunchCardInfo from './LaunchCardInfo';
import RocketLaunchSimulator from './RocketSimulator';
import Lottie from "lottie-react";
import Loading_icon from '../assets/images/loading.json';
import '../assets/styles/Pages.scss';

export default function AboutRockets() {
    const {
        launches,
        launchesLoading,
        launchesError,
    } = useDashboardData();

    if (launchesLoading) {
        return (
            <Container className='text-center py-5'>
                <Lottie
                    animationData={Loading_icon}
                    loop={true}
                    className="loading_icon"
                    aria-label='Loading animation'
                />
                <p className='mt-3'>Loading...</p>
            </Container>
        );
    }

    return (
        <Container fluid className='py-5 content-container'>
            <Row>
                <Col md={launchesError ? 12 : 12}>
                    {!launchesError && (
                        <>
                            <h2 className='mb-4 main_heading'>Upcoming Launches</h2>
                            {launches?.length > 0 ? (
                                launches.slice(0, 5).map((launch) => (
                                    <LaunchCardInfo key={launch.id} launch={launch} />
                                ))
                            ) : (
                                <p>No upcoming launches found.</p>
                            )}
                        </>
                    )}
                    <div className='rocket-simulator-container'>
                        <h2 className='mb-4 main_heading rocket'>Rocket Launch Simulator</h2>
                        <RocketLaunchSimulator />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}