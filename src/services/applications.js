import { db } from "./firebase.js";
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";

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
        const data = doc.data();
        apps.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() ?? "",
            updatedAt: data.updatedAt?.toDate().toISOString() ?? "",
        });
    });

    return apps;
}

export async function deleteApplication(id) {
    await deleteDoc(doc(db, "applications", id));
}