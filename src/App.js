import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/Global.scss'
import Navbar from './components/Navbar';
import MainDashBoard from "./Pages/MainDashBoard";
import Starchart from './Pages/StarChartModal';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import AboutRockets from "./Pages/AboutRockets";
import Gallery from "./Pages/Gallery";
import CosmicObserver from "./components/CosmicObeserver";

function App() {
  return (
    <div className="App theme-dark">
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<MainDashBoard />} />
              <Route path="/rockets" element={<AboutRockets />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/starchart" element={<Starchart />} />
              <Route path="/cosmic" element={<CosmicObserver />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
