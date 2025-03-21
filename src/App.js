import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/Global.scss'
import Navbar from './components/Navbar';
import MainDashBoard from "./Pages/MainDashBoard";
import Dashboard from './Pages/Dashboard';
import Starchart from './components/StarChartModal';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App theme-dark">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainDashBoard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/starchart" element={<Starchart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
