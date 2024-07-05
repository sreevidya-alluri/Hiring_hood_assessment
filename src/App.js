import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Farmers from './components/Farmers';
import Travellers from './components/Travellers';
import EventPlanners from './components/EventPlanners';
import WeatherProvider from './components/WeatherContext';

function App() {
  return (
    <WeatherProvider>
    <Router>
      <div>
      <Header/>
        <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/travellers" element={<Travellers />} />
          <Route path="/event-planners" element={<EventPlanners />} />
        </Routes>
      </div>
    </Router>
    </WeatherProvider>
  );
}

export default App;
