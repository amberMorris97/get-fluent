import { useState, createContext, useEffect } from "react";
import { requestAllPhrases } from "../services/phraseService";
import { requestAddFlashcard } from "../services/UserFlashcardService";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [allPhrases, setAllPhrases] = useState(null);
    const [flashcards, setFlashcards] = useState(null);
    
    const fetchPhrases = async () => {
        let phrases = [];
        
        try {
            let response = await requestAllPhrases();
            setAllPhrases(response.data);
            if (response.status !== 200) {
                // TODO: handle error
                const errorData = await response;
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,
                );
            } else {
                const data = await response.data;
                phrases = data.slice();
            }
        } catch(error) {
            console.error(error);
            // TODO: Give userfeedback
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFlashcards = async (userId) => {
        let flashcards = [];

        try {
            let response = await requestAllFlashcards(userId);

            if (response.status !== 200) {
                // TODO: handle error
                const errorData = await response;
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,
                );
            } else {
                const data = await response.data;
                console.log(data);
            }
        } catch(error) {
            console.error(error);
            // TODO: Give user feedback
        } finally {
            setFlashcards(flashcards)
        }
    }

    const addUserFlashcard = async (userId, phraseId) => {
        try {
            let response = await requestAddFlashcard(userId, phraseId);
            if (response.status !== 200) {
                // TODO: handle error
                const errorData = await response;
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,
                );
            } else {
                const data = await response.data;
                console.log(data);
            }
        } catch (error) {
            console.error(error);
            // TODO: Give user feedback
        } finally {
            setFlashcards
        }
    }

    useEffect(() => {
        fetchPhrases();
    }, []);


    return (
        <DataContext.Provider value={{ isLoading, allPhrases, setAllPhrases }}>
            {!isLoading && children}
        </DataContext.Provider>
    );
};