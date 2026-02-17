import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout.jsx";

import Dashboard from "./routes/dashboard.jsx";
import Login from "./routes/login.jsx";
import Signup from "./routes/signup.jsx";

export const router = createBrowserRouter([
 {
    path: "/",
    element: <Layout />,
    children: [
        {index: true, element:<Dashboard />}, //"/" => Dashboard
        {path: "login",element:<Login />}, //"/login"
        {path: "signup",element:<Signup />}, //"/signup"
    ],

 },
 { path: "*", element: <div style={{padding: 16}}> 404 - Page introuvable</div>},
]);