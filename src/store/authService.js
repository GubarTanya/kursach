// src/store/authService.js
import axios from 'axios';

export default {
    login: async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    }
};
