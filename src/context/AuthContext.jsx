import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../services/firebase.js";

const authContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(authContext);

    if (!ctx) {
        throw new Error("useAuth doit etre utilisé dans un <AuthProvider>");
    }

    return ctx;
}