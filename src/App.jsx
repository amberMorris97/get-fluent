import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './components/HomePage';

import './App.css';
import FlashcardPage from './components/FlashcardPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';

function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
