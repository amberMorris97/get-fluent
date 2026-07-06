import { useState, useEffect } from 'react';
import PhraseCard from './common/PhraseCard';
import generatePhrase from '../utils/generatePhrase';

const HomePage = () => {
    const [allPhrases, setAllPhrases] = useState(null);
    const [currentPhrase, setCurrentPhrase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPhrases = async () => {
        let phrases = [];

        try {
            const response = await fetch('https://docs.google.com/document/d/1vvDmQqC9iugRJSFhHig45uVciUp4z_UVZ0dUC7NyR18/edit?usp=sharing');

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
    }

    useEffect(() => {
        fetchPhrases();
    }, []);

    /* TODO: Style loading element */
    return (
        <div className='home-page'>
            {isLoading ? <p>Loading...</p> : <PhraseCard phrase={currentPhrase} />}
        </div>
    );
};

export default HomePage;