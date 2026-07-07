import { useState, useEffect } from 'react';
import generatePhrase from '../utils/generatePhrase';
import Card from './common/Card';
import Button from './common/Button';

const HomePage = () => {
    const [allPhrases, setAllPhrases] = useState(null);
    const [currentPhrase, setCurrentPhrase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPhrases = async () => {
        let phrases = [];

        try {
            const response = await fetch('https://docs.google.com/document/d/1vvDmQqC9iugRJSFhHig45uVciUp4z_UVZ0dUC7NyR18/export?format=txt');

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
                    }

                    return newPhrase;
                });
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setAllPhrases(phrases);
            setCurrentPhrase(generatePhrase(phrases));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPhrases();
    }, []);

    const handleGetNewPhrase = () => {
        setCurrentPhrase(generatePhrase(allPhrases));
    };

    const addToFlashCards = () => {
        if (localStorage.getItem(currentPhrase.id)) {
            /** TODO, Find better way to let user know flashcard exists/disable add button if flashcard already exists */
            alert('Flashcard already exists!');

            return;
        }
        
        localStorage.setItem(currentPhrase.id, JSON.stringify(currentPhrase));
        alert('Flashcard added!');                      
    }  

    /* TODO: Style loading element */
    return (
        <div className='home-page'>
            {isLoading ? (
                <p>Loading...</p>
             ) : (
                <div className="phrase-card-container">
                    <Card
                        type={'phrases'}
                        phrase={currentPhrase}
                        handleAddFlashcard={addToFlashCards}
                    />
                    <Button label="Next" className="next-phrase-btn btn" onClick={handleGetNewPhrase} />
              </div>
            )}
        </div>
    );
};

export default HomePage;