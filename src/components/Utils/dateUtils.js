// src/utils/dateUtils.js

export const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};