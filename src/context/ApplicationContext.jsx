import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
    const [ applications, setApplications ] = useState([]);

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