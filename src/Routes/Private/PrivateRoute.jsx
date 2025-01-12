import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return "loading...";
    }
    console.log('private user', user)
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!role.includes(user.type)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;