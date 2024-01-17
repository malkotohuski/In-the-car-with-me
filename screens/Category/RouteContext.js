

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
            const response = await axios.get(`${API_BASE_URL}/users`);

            if (response.status === 200) {
                setRoutes(response.data);
            } else {
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(t('Login failed.Invalid email or password.'));
        }
    }

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };

    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };

    const filterAndDeleteExpiredRoutes = async () => {
        const currentDate = new Date();

        for (const route of routes) {
            const routeDate = new Date(route.selectedDateTime);

            if (routeDate <= currentDate) {
                await axios.delete(`${API_BASE_URL}/users/${route.id}`);
                deleteRoute(route.id);
            }
        }

        // Fetch routes again after deletions
        fetchAllRoutes();
    };



    useEffect(() => {
        const intervalId = setInterval(filterAndDeleteExpiredRoutes, 20000); // 1 minute interval

        return () => clearInterval(intervalId); // Cleanup the interval when unmounted
    }, [routes]);

    return (
        <RouteContext.Provider value={{ routes, addRoute, deleteRoute }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRouteContext = () => {
    const context = useContext(RouteContext);
    if (!context) {
        throw new Error('useRouteContext must be used within a RouteProvider');
    }
    return context;
};
