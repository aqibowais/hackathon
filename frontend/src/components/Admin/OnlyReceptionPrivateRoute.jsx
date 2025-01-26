import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OnlyReceptionistPrivateRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.role); // Assuming the user's role is stored in the Redux state

  if (userRole !== 'Receptionist') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default OnlyReceptionistPrivateRoute;
