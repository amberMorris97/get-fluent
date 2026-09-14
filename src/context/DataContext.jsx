import { useState, createContext, useEffect, useContext } from "react";
import { requestAllPhrases } from "../services/phraseService";
import { requestAddFlashcard, requestDeleteFlashcard, requestUpdateFlashcardStatus, requestUserFlashcards } from "../services/userFlashcardService";
import { AuthContext } from "./AuthContext";
import { requestQuizScores, requestSubmitQuizScore } from "../services/quizScoreService";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFlashcardsLoading, setIsFlashcardsLoading] = useState(true);

    const [allPhrases, setAllPhrases] = useState(null);
    const [userFlashcards, setUserFlashcards] = useState(null);
    const [userQuizScores, setUserQuizScores] = useState(null);

    const { auth } = useContext(AuthContext);
    
    const fetchPhrases = async () => {
        try {
            let response = await requestAllPhrases();
            setAllPhrases(response.data);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false)
        }
    };

    const fetchUserFlashcards = async (email) => {
        try {
            let response = await requestUserFlashcards(email);
            let flashcards = response.data.map((flashcard) => {
                const matchingPhrase = allPhrases.find((phrase) => phrase.id === flashcard.phraseId);
                return {
                    ...flashcard,
                    phrase: matchingPhrase,
                };
            });
            setUserFlashcards(flashcards);
        } catch(error) {
            throw error;
        } finally {
            setIsFlashcardsLoading(false);
        }
    };

    const addUserFlashcard = async (email, phraseId) => {
        try {
            await requestAddFlashcard(email, phraseId);
        } catch (error) {
            throw error;
        } finally {
            fetchUserFlashcards(email);
        }
    };

    const deleteUserFlashcard = async (flashcardId) => {
        try {
            await requestDeleteFlashcard(flashcardId);
        } catch(error) {
            throw error;
        } finally {
            fetchUserFlashcards(auth.email);
        }
    };

    const fetchQuizScores = async (email) => {
        try {
            let response = await requestQuizScores(email);
            setUserQuizScores(response.data);
        } catch(error) {
            throw error;
        } 
    }

    const submitQuizScore = async (score, quizLength) => {
        try {
            await requestSubmitQuizScore(auth.email, score, quizLength);
        } catch(error) {
            throw error;
        } finally {
            // TODO:
            fetchQuizScores(auth.email);
        }
    };

    const updateUserFlashcard = async (flashcardStatus, flashcardId) => {
        try {
            await requestUpdateFlashcardStatus(auth.email, flashcardStatus, flashcardId);
            fetchUserFlashcards(auth.email);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    useEffect(() => {
        fetchPhrases();
    }, []);

    useEffect(() => {
        if (auth.isAuthenticated && allPhrases !== null) {
            fetchUserFlashcards(auth.email);
            fetchQuizScores(auth.email);
        }
    }, [auth.isAuthenticated, allPhrases]);


    return (
        <DataContext.Provider value={{ 
            isLoading, 
            isFlashcardsLoading,
            allPhrases,
            setAllPhrases,
            addUserFlashcard,
            userFlashcards,
            deleteUserFlashcard,
            submitQuizScore,
            userQuizScores,
            updateUserFlashcard,
        }}>
            {!isLoading && children}
        </DataContext.Provider>
    );
};