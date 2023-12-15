import React, { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);

    const addRoute = (route) => {
        setRoutes((prevRoutes) => [...prevRoutes, route]);
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
