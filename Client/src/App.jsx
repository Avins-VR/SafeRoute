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
import ResetPassword from './ResetPassword';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sos" element={<Sos />} />
      <Route path="/about" element={<About />} />
      <Route path="/safezone" element={<Safezone />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
