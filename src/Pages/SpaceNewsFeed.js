import React from "react";
import { Card, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import useDashboardData from "../hooks/UseDataFetcher";
import LoadingAnimation from "../assets/images/loading.json";
import ErrorAnimation from "../assets/images/error_info.json";
import "../assets/styles/Explore.scss";

export default function SpaceNewsFeed() {
    const { news, newsLoading, newsError } = useDashboardData();


    if (newsLoading) {
        return (
            <div className="space-news-container">
                <h2 className="text-white mb-4 text-center">Space News</h2>
                <Lottie animationData={LoadingAnimation} loop={true} style={{ height: 400, width: 400 }} />
            </div>
        );
    }

    if (newsError) {
        console.error("News Error:", newsError);
        return (
            <div className="space-news-container">
                <Lottie animationData={ErrorAnimation} loop={false} style={{ height: 350, width: 350 }} />
                <p className="text-danger text-center mt-2">{newsError}</p>
            </div>
        );
    }

    if (!news || news.length === 0) {
        return (
            <div className="space-news-container">
                <p className="text-white text-center">No space news available at this time.</p>
            </div>
        );
    }

    return (
        <div className="space-news-container">
            {news.map((article, index) => (
                <Card key={index} className="news-card mb-3">
                    {article.image && (
                        <Card.Img variant="top" src={article.image} alt={article.title} className="news-image" />
                    )}
                    <Card.Body>
                        <Card.Title className="text-white">{article.title}</Card.Title>
                        <Card.Text className="text-white">{article.description}</Card.Text>
                        <Card.Text className="text-white"><small>{article.content}</small></Card.Text>
                        <p className="source">Source: {article.source?.name || 'Unknown Source'}</p>
                        <Button variant="outline-light" href={article.url} target="_blank" rel="noopener noreferrer">
                            Read More
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
