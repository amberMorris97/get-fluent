import { useState, createContext, useEffect } from "react";
import { requestAllPhrases } from "../services/phraseService";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [allPhrases, setAllPhrases] = useState(null);
    
    const fetchPhrases = async () => {
        let phrases = [];
        
        try {
            let response = await requestAllPhrases();
            if (response.status !== 200) {
                const errorData = await response.json();
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
            setAllPhrases(phrases);
        }
    };

    useEffect(() => {
        fetchPhrases();
    }, []);

    useEffect(() => {
        if (allPhrases !== null) {
            setIsLoading(false);
        }
    }, [allPhrases]);

    return (
        <DataContext.Provider value={{ isLoading, allPhrases, setAllPhrases }}>
            {children}
        </DataContext.Provider>
    );
};