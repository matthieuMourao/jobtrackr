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

    return (
        <ApplicationContext.Provider value={{ applications, addApplication }}>
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