import Lottie from "lottie-react";
import Welcome from '../assets/images/welcome.json';

export default function MainDashBoard() {
    return (
        <div>
            <Lottie
                animationData={Welcome}
                loop={true}
                className="welcome" />
        </div>
    )
}