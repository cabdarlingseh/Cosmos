import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { createClient } from "pexels";
import "../assets/styles/Gallery.scss";
import Lottie from "lottie-react";
import Loading_icon from "../assets/images/loading.json";
import Error_icon from "../assets/images/error_info.json";

const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);

export default function SpaceArtGallery() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            if (!process.env.REACT_APP_PEXELS_API_KEY) {
                console.error("Pexels API key is missing.");
                setLoading(false);
                return;
            }

            const randomKeywords = ["space", "galaxy", "stars", "planets", "nebula", "cosmos"];
            const randomQuery = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
            const randomPage = Math.floor(Math.random() * 10) + 1;

            try {
                const response = await client.photos.search({
                    query: randomQuery,
                    per_page: 10,
                    page: randomPage,
                });
                const photos = response.photos.map(photo => ({
                    id: photo.id,
                    title: photo.alt || "Untitled Artwork",
                    image: photo.src.large,
                }));
                setArtworks(photos);
                setLoading(false);
            } catch (error) {
                setError("Failed to load space art from Pexels.");
                setLoading(false);
                console.error("Pexels API Error:", error);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) {
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

    if (error) {
        return (
            <Container className='text-center py-5'>
                <Lottie
                    animationData={Error_icon}
                    loop={true}
                    className="error_icon"
                    aria-label='Error animation'
                />
                <p className='mt-3'>{error}</p>
            </Container>
        );
    }

    if (!artworks.length) {
        return (
            <Container className='text-center py-5'>
                <p className='mt-3'>No artworks available at the moment.</p>
            </Container>
        );
    }

    return (
        <div className="space-art-gallery">
            <Carousel>
                {artworks.map((artwork) => (
                    <Carousel.Item key={artwork.id}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={artwork.image}
                            alt={artwork.title || "Space artwork"}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}