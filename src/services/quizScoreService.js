import apiClient from "../config/api-client"

export const requestSubmitQuizScore = (email, score, quizLength) => {
    return apiClient.post('/quizScores/submit', { emailAddress: email, score, quizLength });
};

export const requestQuizScores = (email) => {
    return apiClient.get(`/quizScores/${email}`)
};