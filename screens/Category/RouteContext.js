import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = 'http://10.0.2.2:3000';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();

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

    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
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

    const removeRoute = async (routeId) => {
        try {
            await axios.delete(`${API_BASE_URL}/routes/${routeId}`);
            setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };

    const deletedRoute = async (userRouteId) => {
        try {
            await axios.patch(`${API_BASE_URL}/routes/${userRouteId}`);
            setRoutes((prevRoutes) => prevRoutes.filter(route => route.userID !== userRouteId));
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };

    const markRouteAsCompleted = async (routeId) => {
        try {
            // Assuming there is an endpoint to mark the route as completed
            await axios.patch(`${API_BASE_URL}/routes/${routeId}`, { completed: true });
            // You may need to update the route status in your state, depending on how your API works
        } catch (error) {
            console.error('Error marking route as completed:', error);
        }
    };

    const fetchAllRoutes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/routes`);

            if (response.status === 200) {
                // Филтрираме маршрутите, които имат userRouteId, различен от "deleted"
                const filteredRoutes = response.data.filter(route => route.userRouteId !== "deleted");
                setRoutes(filteredRoutes);
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
            removeRoute,
            deleteRoute,
            deletedRoute,
            addRequest,
            getRequestsForRoute,
            getRequestsForRouteById,
            refreshUserData,
            markRouteAsCompleted
        }}>
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
