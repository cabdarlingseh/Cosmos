import Lottie from "lottie-react";
import Welcome from '../assets/images/welcome.json';
import '../assets/styles/MainDashBoard.scss';

export default function MainDashBoard() {
    return (
        <div className="main-dashboard-container">
            <div className="container-fluid py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <h1 className="mb-4">Discover the cosmos</h1>
                        <Lottie
                            animationData={Welcome}
                            loop={true}
                            className="welcome"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}