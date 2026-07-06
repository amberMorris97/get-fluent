import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './components/HomePage';

import './App.css';
import FlashcardPage from './components/FlashcardPage';

function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
      </Routes>
    </div>
  );
};

export default App;
