import apiClient from "../config/api-client";

export const requestAllFlashcards = (userId) => {
    return apiClient.get(`/userFlashcards/:${userId}`);
};

export const requestAddFlashcard = (email, phraseId) => {
    return apiClient.post('/userFlashcards/addFlashcard', { email, phraseId, status: "NEEDS_WORK" });
};