import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';
// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_USER = "UPDATE_USER"

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload,
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [profilePicture, setProfilePicture] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateProfilePicture = (newPicture) => {
        setProfilePicture(newPicture);
    };

    const login = (user) => {
        console.log('Logging in:', user);
        dispatch({ type: LOGIN, payload: user });
        setUser(user);
        setLoading(false);
    };

    const logout = () => {
        console.log('Logging out');
        dispatch({ type: LOGOUT });
    };

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };

    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };




    return (
        <AuthContext.Provider value={{ state, user, loading, login, logout, addRoute, deleteRoute, profilePicture, updateProfilePicture }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export { AuthProvider, useAuth };

