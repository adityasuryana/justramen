import React from 'react'
import Cookies from "js-cookie"
import { Outlet, Navigate } from "react-router"

export const ProtectedRouted = () => {
    const token = Cookies.get("token");
    
    return token ? <Outlet /> : <Navigate to="/login" />;
}
