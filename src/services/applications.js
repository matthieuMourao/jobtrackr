import { db } from "./firebase.js";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";

export async function creatApplication(data) {
    const docRef = await addDoc(collection(db, "applications"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
}

export async function getApplications() {
    const querySnapshot = await getDocs(collection(db, "applications"));

    const apps = [];

    querySnapshot.forEach((doc) => {
        apps.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return apps;
}