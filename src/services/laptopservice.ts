import { db } from "./firebase";
import type Laptop from "../types/laptop"
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";

type NewLaptop = Omit<Laptop, "id">;


export const addLaptop = async (laptop: NewLaptop) => {
  await addDoc(collection(db, "laptops"), laptop);
};


export const updateLaptop = async (id: string, laptop: Partial<Laptop>) => {
  console.log("Updating laptop document:", { id, name: laptop.name, images: laptop.imgUrl?.length ?? 0 });
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
