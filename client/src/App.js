import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVenue from './components/AddVenue';
import ViewVenues from "./components/ViewVenue";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddFeedback from "./components/AddFeedback";
import Register from "./components/Register";
import Login from "./components/login"; // Capital 'L'
import './App.css'; 
// import './style.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<h1>Wedding Adda 💒</h1>} />
          <Route path="/addvenue" element={<AddVenue />} />
          <Route path="/viewvenues" element={<ViewVenues />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<AddFeedback />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
