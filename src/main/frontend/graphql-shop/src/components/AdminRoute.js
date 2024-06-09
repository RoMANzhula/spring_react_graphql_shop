import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { jwtDecode } from 'jwt-decode';

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  let userRole = null;
  
  if (user && localStorage.getItem("jwt")) {
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role.toString();
  }

  if (!user || userRole !== 'ROLE_ADMIN') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
