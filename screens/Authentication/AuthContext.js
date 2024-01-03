import React, { createContext, useReducer, useContext, useState } from 'react';

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <AuthContext.Provider value={{ state, user, loading, login, logout }}>
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

