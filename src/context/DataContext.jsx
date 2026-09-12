import { useState, createContext, useEffect, useContext } from "react";
import { requestAllPhrases } from "../services/phraseService";
import { requestAddFlashcard, requestAllFlashcards } from "../services/UserFlashcardService";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [allPhrases, setAllPhrases] = useState(null);
    const [userFlashcards, setUserFlashcards] = useState(null);

    const { auth } = useContext(AuthContext);
    
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

    const fetchUserFlashcards = async (email) => {
        let flashcards = [];
        try {
            let response = await requestAllFlashcards(email);

            if (response.status !== 200) {
                // TODO: handle error gracefully
                const errorData = response;
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,
                );
            } else {
                flashcards = response.data;
            }
        } catch(error) {
            console.error(error);
            // TODO: Give user feedback
        } finally {
            setUserFlashcards(flashcards)
        }
    }

    const addUserFlashcard = async (email, phraseId) => {
        try {
            await requestAddFlashcard(email, phraseId);
        } catch (error) {
            throw error;
        } finally {
            fetchUserFlashcards(email);
        }
    }

    useEffect(() => {
        fetchPhrases();

        if (auth.isAuthenticated) {
            fetchUserFlashcards(auth.email);
        }
    }, []);


    return (
        <DataContext.Provider value={{ isLoading, allPhrases, setAllPhrases, addUserFlashcard }}>
            {!isLoading && children}
        </DataContext.Provider>
    );
};