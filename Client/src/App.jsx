import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Sos from './Sos';
import About from './About';
import Safezone from './Safezone';
import Tracking from './Tracking'; 
import Contact from './Contact'; 
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Sos" element={<Sos />} />
      <Route path="/About" element={<About/>} />
      <Route path="/Safezone" element={<Safezone />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
