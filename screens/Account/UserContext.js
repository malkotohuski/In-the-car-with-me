import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(null);

    const updateProfilePicture = (newPicture) => {
        setProfilePicture(newPicture);
    };

    return (
        <UserContext.Provider value={{ profilePicture, updateProfilePicture }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
