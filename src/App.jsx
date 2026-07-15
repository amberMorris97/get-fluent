import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';

import './App.css';
import FlashcardPage from './components/pages/FlashcardPage';
import AboutPage from './components/pages/AboutPage';
import Footer from './components/layout/Footer';
import Modal from './components/common/Modal';
import ResourceLink from './components/common/ResourceLink';

import resourceData from './components/mock-data/resourceData';
import AllPhrasesPage from './components/pages/AllPhrasesPage';
import generatePhrase from './utils/generatePhrase';

function App() {
  const [allPhrases, setAllPhrases] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const fetchPhrases = async () => {
      let phrases = [];

      try {
          const response = await fetch(`https://docs.google.com/document/d/1_o_TSi7t8-s5K8uS3xBMxIzv8UCkRyjt2wOZddbw9JI/export?format=txt&cb=${Date.now()}`);

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `ERROR - Status ${response.status}`);
          } else {
              const data = await response.json(); 
              phrases = data.map((phrase) => {
                  let newPhrase = {
                      id: phrase.id,
                      phrase: phrase.phrase,
                      translation: phrase.translation,
                      pronunciation: phrase.pronunciation,
                  }

                  return newPhrase;
              });
          }
      } catch (error) {
          console.error(error.message);
      } finally {
          setIsLoading(false);
          setAllPhrases(phrases);
          setCurrentPhrase(generatePhrase(phrases));
      }
    };

    useEffect(() => {
        fetchPhrases();
    }, []);

  const renderResourceData = resourceData.map((resource, idx) => {
    return (
      <ResourceLink
        key={idx}
        title={resource.title}
        description={resource.description}
        url={resource.url}
      />
    );
  });

  return (
    <div className="app-container">
      <Header setIsOpen={setIsOpen} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Modal className="intro-modal" open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="modal-inner">
            <span className="before-you-start">BEFORE YOU START</span>
            <h2 className="haiti-aid-title">Haiti is facing an ongoing humanitarian crisis</h2>
            <p className="haiti-aid-paragraph">
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
          <Route path="/" element={
            <HomePage
              allPhrases={allPhrases}
              setCurrentPhrase={setCurrentPhrase}
              currentPhrase={currentPhrase}  
            />
              } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/all-phrases" element={<AllPhrasesPage allPhrases={allPhrases} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
      )}
      
      <Footer />
    </div>
  );
};

export default App;
