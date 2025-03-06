import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LaunchCardInfo from '../components/LaunchCardInfo';
import ExploreUniverse from '../components/ExploreUniverse';
import PictureOfTheDay from '../components/PictureOfTheDay';
import SpaceData from '../hooks/DataFetcher';
import Lottie from "lottie-react";
import Loading_icon from '../assets/images/loading.json';
import Error_icon from '../assets/images/error_info.json';
import '../assets/styles/Dashboard.scss';
import { div } from 'framer-motion/client';

export default function Dashboard() {

    const { launches, picture, loading, error } = SpaceData();


    // Loading  State

    if (loading) {
        return (
            <Container className='text-center py-5'>
                <Lottie
                    animationData={Loading_icon}
                    loop={true}
                    className="loading_icon"
                    aria-label='Loading animation'
                />

                <p className='mt-3'>Loading Data...</p>
            </Container>
        );
    }

    //Error State

    if (error) {
        return (
            <Container>
                <Lottie
                    animationData={Error_icon}
                    loop={true}
                    className="error_icon"
                    aria-label='Error animation' />

                <p className='mt-3'>Opps! Something went wrong. Please try again later.</p>
            </Container>
        );
    }

    return (
        <Container fluid className='py-4'>
            <Row>

                <Col md={6}>
                    <h2 className='mb-4'>Upcoming Launches</h2>
                    {launches.length > 0 ? (
                        launches.slice(0, 10).map((launch) => (
                            <LaunchCardInfo key={launch.id} launch={launch} />
                        ))
                    ) : (
                        <p>No upcoming launches found.</p>
                    )}
                </Col>

                <Col md={6}>
                    <h2 className='mb-4'>Astronomy picture of the day</h2>
                    <PictureOfTheDay picture={picture} />
                    <h2 className='mt-5 mb-4'>Explorer of the Universe</h2>
                    <ExploreUniverse />
                </Col>
            </Row>
        </Container>
    )
}