import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetchAllRoutes();
    }, []);

    const fetchAllRoutes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/routes`);

            if (response.status === 200) {
                console.log('asdad', response);
                // Successful login, update the global state with user data
                setRoutes(response.data);
            } else {
                // Handle login failure (e.g., display an error message)
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            // Handle any error that occurred during the API call
            console.error('Login Error:', error);
            alert(t('Login failed.Invalid email or password.'));
        }

    }

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);

    };
    return (
        <RouteContext.Provider value={{ routes, addRoute }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRouteContext = () => {
    return useContext(RouteContext);
};
