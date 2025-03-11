import { Link } from "react-router-dom";
import '../assets/styles/NotFound.scss';
import Lottie from "lottie-react";
import NotFoundAnimation from '../assets/images/not_found.json';

export default function NotFound() {
    return (
        <div className="not_found d-flex flex-column justify-content-center align-items-center vh-100">
            <Lottie
                animationData={NotFoundAnimation}
                loop={true}
                className="not_found_animation w-100"
                aria-label="Not Found Animation"
            />

            <Link to='/' className="go_home btn btn-primary mt-3">
                Go Home
            </Link>
        </div>
    )
}
