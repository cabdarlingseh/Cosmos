import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../assets/styles/NotFound.scss';
import Lottie from "lottie-react";
import NotFoundAnimation from '../assets/images/not_found.json';

export default function NotFound() {
    return (
        <div className="not_found">
            <Lottie
                animationData={NotFoundAnimation}
                loop={true}
                className="not_found_animation"
                aria-label="Not Found Animation"
            />

            {/* <Link to='/' className="go_home">Go Home</Link> */}
        </div>
    )
}
