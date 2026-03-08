import { db } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function creatApplication(data) {
    const docRef = await addDoc(collection(db, "application"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
}