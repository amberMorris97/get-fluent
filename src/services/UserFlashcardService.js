import apiClient from "../config/api-client";

export const requestAddFlashcard = (userId, phraseId) => {
    return apiClient.post('/userFlashcards/add', { userId, phraseId, status: "NEEDS_WORK" });
}