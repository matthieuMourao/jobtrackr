import { createContext, useContext, useEffect, useState } from "react";
import { UNSAFE_decodeViaTurboStream } from "react-router-dom";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
    const [ applications, setApplications ] = useState(() => {
        try {
            const raw = localStorage.getItem("jobtrackr_applications");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect (() => {
        localStorage.setItem(
            "jobtrackr_applications",
            JSON.stringify(applications)
        );
    }, [applications]);

    function addApplication(app) {
        setApplications((prev) => [...prev, app]);
    }

    function removeApplication(id) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
    }

    function updateStatus(id, newStatus) {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id ? {...app, status: newStatus } : app 
            )
        );
    }

    return (
        <ApplicationContext.Provider value={{ applications, addApplication, removeApplication, updateStatus }}>
            {children}
        </ApplicationContext.Provider>
    );
}

export function useApplications() {
    const ctx = useContext(ApplicationContext);
    if (!ctx) {
        throw new Error("useApplications doit etre utiliser dans un <ApplicationsProvider>");
    }
    return ctx;
}