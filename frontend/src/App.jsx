import './App.css';
import Home1st from './components/Home1st';
import Job from './components/Job';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from './components/News';
import Footer from './components/Footer';
import Watchlist from './components/Watchlist';
import Chatbot from './components/Chatbot';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import { useState } from 'react';

function App() {
  const [options, setoptions] = useState(true);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home1st />} />
        <Route path='/jobs' element={<Job options={options} setoptions={setoptions} />} />
        <Route path='/news' element={<News options={options} setoptions={setoptions} />} />
        <Route path='/resume' element={<ResumeBuilder />} />
        <Route path='/resume-builder' element={<ResumeBuilder />} />
        <Route path='/watchlist' element={<Watchlist options={options} setoptions={setoptions} />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
