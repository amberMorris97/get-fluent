import apiClient from "../config/api-client";

export const requestRegistration = userProfile => {
    return apiClient.post('/user/register', userProfile);
};

export const requestLogin = authRequest => {
    return apiClient.post('/user/loegin', authRequest);
};

export const requestLogout = () => {
    return apiClient.post('/user/logout');
}

export const validateToken = validationRequest => {
    return apiClient.post('/user/validate-token', validationRequest);
};