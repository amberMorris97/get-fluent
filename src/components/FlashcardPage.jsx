import { useState, useEffect } from 'react';
import generatePhrase from '../utils/generatePhrase';
import Button from './common/Button';
import Card from './common/Card';
import parseFlashcards from '../utils/parseFlashcards';

const FlashcardPage = () => {
    const [allFlashcards, setAllFlashcards] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [currentFlashcardPhrase, setCurrentFlashcardPhrase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const flashcards = parseFlashcards({ ...localStorage });
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

    const removeFlashcard = (e) => {
        e.stopPropagation();

        localStorage.removeItem(currentFlashcardPhrase.id);

        const updatedFlashcards = parseFlashcards({ ...localStorage });

        /** TODO: popup to alert user */
        alert('Flashcard removed!');
        
        setAllFlashcards(updatedFlashcards);
        setCurrentFlashcardPhrase(generatePhrase(updatedFlashcards));
        setFlipped(false);
    }

    if (!isLoading && allFlashcards.length <= 0) {
        /** TODO: Style "No flashcards" display, link back to home page */
        return (
            <div>
                <Card />
            </div>
        );
    }

    return (
        <div className="flashcard-container">
            <h2>Flashcards</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div className={`flashcard-wrapper ${flipped ? 'flipped' : ''}`}>
                <Card 
                    phrase={currentFlashcardPhrase} 
                    flipped={flipped} 
                    onClick={handleFlipState}
                    handleRemoveFlashcard={removeFlashcard}
                    type={'flashcards'}
                />
            </div>
          )}

          {!isLoading && (
            <div className='flashcard-btns'>
                <Button label="Next" className="next-flashcard-btn btn" onClick={handleNextFlashcard} />
                <Button label="Remove from flashcards" className="remove-flashcard-btn btn" onClick={removeFlashcard} />
            </div>
          )}
        </div>
    );
};

export default FlashcardPage;