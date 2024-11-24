import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AuthRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthRoute;