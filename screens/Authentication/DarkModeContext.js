// DarkModeContext.js
import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const backgroundImage = darkMode
        ? require('../../images/d6.png')
        : require('../../images/home2-background.jpg');

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, backgroundImage }}>
            {children}
        </DarkModeContext.Provider>
    );
};
