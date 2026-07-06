import { useState, useEffect } from 'react';
import Flashcard from './common/Flashcard';
import generatePhrase from '../utils/generatePhrase';
import Button from './common/Button';
import Card from './common/Card';

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
        setFlipped(false);
    };

    if (!isLoading && allFlashcards.length <= 0) {
        /** TODO: Style "No flashcards" display, link back to home page */
        return (
            <div>
                <Card>
                    <h2>No flashcards yet</h2>
                    <h3>Go add some!</h3>
                </Card>
            </div>
        )
    }

    return (
        <div className="flashcard-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div className="flashcard-wrapper">
                <Flashcard 
                    phrase={currentFlashcardPhrase} 
                    flipped={flipped} 
                    handleFlipState={handleFlipState} 
                />
                <Button label="Next" onClick={handleNextFlashcard} />
            </div>
          )}
        </div>
    );
};

export default FlashcardPage;