import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';

import './App.css';
import FlashcardPage from './components/pages/FlashcardPage';
import AboutPage from './components/pages/AboutPage';
import Footer from './components/layout/Footer';
import Modal from './components/common/Modal';
import ResourceLink from './components/common/ResourceLink';

import resourceData from './utils/resourceData';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const renderResourceData = resourceData.map((resource) => {
    return (
      <ResourceLink
        title={resource.title}
        description={resource.description}
        url={resource.url}
      />
    );
  });

  return (
    <div className="app-container">
      <Header />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='modal-inner'>
          <span className='before-you-start'>BEFORE YOU START</span>
          <h2>Haiti is facing an ongoing humanitarian crisis</h2>
          <p>
            Armed violence and displacement have disrupted daily life for millions
            of people in Haiti, and access to food, healthcare, and safety remains limited
            in many areas. If you'd like to help, here are a few vetted organiztions working
            on the ground:
          </p>
          <div className="haiti-aid-links">
            {renderResourceData}
          </div>
        </div>
      </Modal>
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
