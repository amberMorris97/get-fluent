import { useState, useEffect } from 'react';
import generatePhrase from '../../utils/generatePhrase';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const HomePage = () => {
    const [allPhrases, setAllPhrases] = useState(null);
    const [currentPhrase, setCurrentPhrase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

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
            setIsLoading(false);
            setAllPhrases(phrases);
            setCurrentPhrase(generatePhrase(phrases));
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
        setIsOpen(true);                    
    }  

    /* TODO: Style loading element */
    return (
        <section className='home-page'>
            {isLoading ? (
                <p>Loading...</p>
             ) : (
                <>
                    <h1 className='title'>Pick up a new phrase everyday</h1>
                    <span className='sub-title'>Learn phrases in Haitian Creole</span>
                    <Card
                        type={'phrases'}
                        phrase={currentPhrase}
                        handleAddFlashcard={addToFlashCards}
                    />
                    <Modal className="flashcard-added-popup" open={isOpen} onClose={() => setIsOpen(false)}>
                        <span>Flashcard has been added!</span>
                    </Modal>
                    <div className='home-page-btns'>
                        <Button label="Next phrase" className="next-phrase-btn btn" onClick={handleGetNewPhrase} />
                        <Button label="Add to flashcards" className="add-flashcard-btn btn" onClick={addToFlashCards} />
                    </div>
              </>
            )}
        </section>
    );
};

export default HomePage;