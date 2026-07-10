import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';

import './App.css';
import FlashcardPage from './components/pages/FlashcardPage';
import AboutPage from './components/pages/AboutPage';
import Footer from './components/layout/Footer';

function App() {
 
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
