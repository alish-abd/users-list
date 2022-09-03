import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Register from "./Register";

const Protected = () => {
  //if there is a user-info in localStorage, then the outlet routes will be displayed
  //if there is no user-ingo in localSorage - redirect to register 
  return localStorage.getItem("user-info", true) ? (
    <Outlet />
  ) : (
    <Navigate to="/register" />
  );
};

export default Protected;
