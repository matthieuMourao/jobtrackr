import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/dashboard.jsx";
import Login from "./routes/login.jsx";
import Signup from "./routes/signup.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);