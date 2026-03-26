import { db } from "./firebase";
import type {Laptop} from "../types/laptop"
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";

// Define a type for the laptop data for better type safety


export const addLaptop = async (laptop: Laptop) => {
  await addDoc(collection(db, "laptops"), laptop);
};


export const updateLaptop = async (id: string, laptop: Partial<Laptop>) => {
  const laptopDoc = doc(db, "laptops", id);
  await updateDoc(laptopDoc, {
      ...laptop,
      updatedAt: new Date()
  });
};

export const getAllLaptops = async () => {
  const snapshot = await getDocs(collection(db, "laptops"))

  const laptops = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return laptops
}