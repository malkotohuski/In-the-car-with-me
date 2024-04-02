import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchAllRoutes();
        fetchAllRequests();
    }, []);

    const refreshUserData = async () => {
        fetchAllRequests();
    };

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };

    const addRequest = (newRequest) => {
        setRequests((prevRequests) => [...prevRequests, newRequest]);
    };

    const getRequestsForRouteById = (routeId) => {
        return requests.filter(request => request.routeId === routeId);
    };

    const getRequestsForRoute = (routeId) => {
        const route = routes.find(route => route.id === routeId);

        if (route && route.requests) {
            return route.requests.map(request => ({ id: request.id, requestingUser: request.requestingUser }));
        } else {
            return [];
        }
    };

    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };

    const fetchAllRoutes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/routes`);

            if (response.status === 200) {
                setRoutes(response.data);
            } else {
                alert(t('Login faile. Pleass check your credentials.'));
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(t('Login failed.Invlid email  password.'));
        }
    }

    const fetchAllRequests = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/requests`);

            if (response.status === 200) {
                setRequests(response.data);
            } else {
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            console.error('Error fetching requests:', error);

        }
    }

    const filterAndDeleteExpiredRoutes = () => {
        const currentDate = new Date();
        const filteredRoutes = routes.filter((route) => {
            const routeDate = new Date(route.selectedDateTime);
            return routeDate >= currentDate;
        });
        setRoutes(filteredRoutes);
    };

    useEffect(() => {
        const intervalId = setInterval(filterAndDeleteExpiredRoutes, 100000); // 1 minute interval
        return () => clearInterval(intervalId); // Cleanup the interval when unmounted
    }, [routes]);

    return (
        <RouteContext.Provider value={{
            routes,
            requests,
            addRoute,
            deleteRoute,
            addRequest,
            getRequestsForRoute,
            getRequestsForRouteById,
            refreshUserData
        }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRouteContext = () => {
    const context = useContext(RouteContext);
    if (!context) {
        throw new Error('useRouteContext must beused within a RouteProvider');
    }
    return context;
};
