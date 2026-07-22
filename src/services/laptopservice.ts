import { db } from "./firebase";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;
import type Laptop from "../types/laptop"
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";

type NewLaptop = Omit<Laptop, "id">;


export const addLaptop = async (laptop: NewLaptop) => {
  await addDoc(collection(db, "laptops"), {
    ...laptop,
    admin_secret: ADMIN_SECRET,
  });
};


export const updateLaptop = async (id: string, laptop: Partial<Laptop>) => {
  console.log("Updating laptop document:", { id, name: laptop.name, images: laptop.imgUrl?.length ?? 0 });
  const laptopDoc = doc(db, "laptops", id);
  await updateDoc(laptopDoc, {
      ...laptop,
      updatedAt: new Date(),
      admin_secret: ADMIN_SECRET,
  });
};

export const getAllLaptops = async () => {
  // 1. Reference the "laptops" collection
  const laptopsCollection = collection(db, "laptops");

  // 2. Build a query filtering by your hidden admin secret
  const q = query(
    laptopsCollection, 
    where("admin_secret", "==", ADMIN_SECRET)
  );
  // 3. Fetch the filtered query instead of the entire collection
  const snapshot = await getDocs(q);

  // 4. Map over the docs to extract the data
  const laptops = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return laptops;
};