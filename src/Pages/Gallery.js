import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useDashboardData from "../hooks/UseDataFetcher";
import PictureOfTheDay from "../Pages/PictureOfTheDay";
import SpaceArtGallery from '../Pages/SpaceArt';
import Lottie from "lottie-react";
import Loading_icon from "../assets/images/loading.json";
import Error_icon from "../assets/images/error_info.json";
import '../assets/styles/Pages.scss';

export default function Gallery() {

    const {
        picture,
        pictureLoading,
        pictureError,
    } = useDashboardData();

    if (pictureLoading) {
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

    return (
        <Container fluid className='py-5 content-container'>
            <Row>
                <Col md={12}>
                    {!pictureError && (
                        <>
                            <h2 className='mb-4 main_heading'>Astronomy Picture of the Day</h2>
                            <PictureOfTheDay
                                picture={picture}
                                loading={pictureLoading}
                                error={pictureError}
                                fullWidth={true}
                            />
                        </>
                    )}
                    {pictureError && (
                        <div className='text-center'>
                            <Lottie
                                animationData={Error_icon}
                                loop={false}
                                className="error_icon"
                                aria-label='Error animation'
                            />
                            <p className='mt-3 error_message'>
                                Failed to load picture: {pictureError}
                            </p>
                        </div>
                    )}
                    <h2 className='mb-4 main_heading space-art'>Space Art Gallery</h2>
                    <SpaceArtGallery />
                </Col>
            </Row>
        </Container>
    )
}