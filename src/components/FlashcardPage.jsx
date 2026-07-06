import { useState, useEffect } from 'react';
import Flashcard from './common/Flashcard';
import generatePhrase from '../utils/generatePhrase';
import Button from './common/Button';

const FlashcardPage = () => {
    const [allFlashcards, setAllFlashcards] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [currentFlashcardPhrase, setCurrentFlashcardPhrase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const flashcards = Object.entries({ ... localStorage }).map(flashcard => JSON.parse(flashcard[1]));
    
        setAllFlashcards(flashcards);
        setCurrentFlashcardPhrase(generatePhrase(flashcards));
        setIsLoading(false);
    }, []);

    const handleFlipState = () => {
        setFlipped(!flipped);
    };

    const handleNextFlashcard = () => {
        setCurrentFlashcardPhrase(generatePhrase(allFlashcards));
    };

    return (
        <div className="flashcard-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <Flashcard 
                phrase={currentFlashcardPhrase} 
                flipped={flipped} 
                handleFlipState={handleFlipState} 
            />
          )}
        </div>
    );
};

export default FlashcardPage;