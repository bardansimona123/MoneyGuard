// src/utils/authUtils.js

export const isTokenValid = (token) => {
    if (!token) return false;
    // Adaugă logica de validare aici
    return true;
};

export const decodeToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};