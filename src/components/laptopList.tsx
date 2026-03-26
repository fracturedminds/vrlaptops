import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase"; // Corrected import path
import LaptopForm from "./laptopForm";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"


// Define a type for the laptop data for better type safety
interface Laptop {
    id: string
    name: string
    brand: string
    quantity: number
    price: number
    offerPrice: number
    processor: string
    ram: string
    disk: string
    screenSize: string
    inStock: boolean
    featured: boolean
    createdAt: Date
    updatedAt: Date
  }
  // Add other laptop properties here as needed


export default function LaptopList() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [open,setOpen] = useState(false)
  const [selectedLaptop,setSelectedLaptop] = useState<any>(null)

  const fetchLaptops = async () => {
    const snapshot = await getDocs(collection(db, "laptops"));
    const list = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Laptop)
    );
    setLaptops(list);
  };


  useEffect(() => {
    fetchLaptops();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "laptops", id));
    setLaptops(prev => prev.filter(l => l.id !== id))
  };
  const handleEdit = (laptop:any) => {
    setSelectedLaptop(laptop)
    setOpen(true)
  } 
    
  return (
    <div>
      {laptops.map((laptop) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={laptop.id}
          sx={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <span>{laptop.name}</span>
          <div>
            <Button variant="contained" size="small" onClick={() => handleEdit(laptop)} sx={{ mr: 1 }}>
              View/Edit
              <Dialog open={open} onClose={()=>setOpen(false)} maxWidth="md" fullWidth>

              <DialogTitle>Edit Laptop</DialogTitle>

              <DialogContent>

              <LaptopForm
                  closeForm={()=>setOpen(false)}
                  editLaptop={selectedLaptop}
                 />

              </DialogContent>

              </Dialog>
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(laptop.id)}
            >
              Delete
            </Button>
          </div>
        </Stack>
      ))}
    </div>
  );
}
