// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Importa useSelector
import App from './App';

const ProtectedRoute = () => {
    // Assume che il token sia conservato in uno slice dello store chiamato 'auth'
    const token = useSelector(state => state.token.value); 
    console.log(token) 
    const isAuthenticated = !!token;  // Verifica l'autenticazione controllando la presenza del token
    return isAuthenticated ? <App/> : <Navigate to="/authentication" />;
};

export default ProtectedRoute;
