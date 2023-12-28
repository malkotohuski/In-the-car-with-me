import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
            params: {
                username: credentials.username,
                password: credentials.password,
            },
        });

        if (response.data.length === 1) {
            return response.data[0];
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
