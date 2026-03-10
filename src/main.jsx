import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./index.css";
import { ApplicationProvider } from "./context/ApplicationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApplicationProvider>
        <RouterProvider router={router} />
      </ApplicationProvider>
    </AuthProvider>
  </StrictMode>
);