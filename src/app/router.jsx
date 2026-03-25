import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Dashboard from "./routes/dashboard.jsx";
import Login from "./routes/login.jsx";
import Signup from "./routes/signup.jsx";
import New from "./routes/new.jsx";

export const router = createBrowserRouter([
 {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
        },
        {
            path: "new",
            element: (
                <ProtectedRoute>
                    <New />
                </ProtectedRoute>
            ),
        },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
    ],

 },
 { path: "*", element: <div style={{padding: 16}}> 404 - Page introuvable</div>},
]);