import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { db } from "../services/firebase";
import LaptopForm from "./laptopForm";
import type Laptop from "../types/laptop";

interface LaptopListProps {
  refreshSignal?: number;
}

export default function LaptopList({ refreshSignal = 0 }: LaptopListProps) {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);

  const fetchLaptops = async () => {
    const snapshot = await getDocs(collection(db, "laptops"));
    const list = snapshot.docs.map(
      (itemDoc) =>
        ({
          id: itemDoc.id,
          ...itemDoc.data(),
        } as Laptop)
    );
    setLaptops(list);
  };

  useEffect(() => {
    fetchLaptops();
  }, [refreshSignal]);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "laptops", id));
    setLaptops((prev) => prev.filter((laptop) => laptop.id !== id));
  };

  const handleEdit = (laptop: Laptop) => {
    setSelectedLaptop(laptop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLaptop(null);
  };

  return (
    <>
      <Stack spacing={1.2}>
        {laptops.map((laptop) => (
          <Box
            key={laptop.id}
            sx={{
              border: "1px solid #e3e6ee",
              borderRadius: 2,
              px: { xs: 1.2, sm: 1.6 },
              py: { xs: 1.1, sm: 1.3 },
              bgcolor: "#fff",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
            >
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{laptop.name}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.6, flexWrap: "wrap", rowGap: 0.6 }}>
                  <Chip label={laptop.brand} size="small" />
                  <Chip label={`₹${Number(laptop.offerPrice || laptop.price).toLocaleString()}`} size="small" color="primary" variant="outlined" />
                  {laptop.inStock ? <Chip label="In Stock" size="small" color="success" /> : <Chip label="Out of Stock" size="small" color="default" />}
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(laptop)}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  View / Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => handleDelete(laptop.id)}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Laptop</DialogTitle>
        <DialogContent>
          <LaptopForm closeForm={handleClose} editLaptop={selectedLaptop} onSaved={fetchLaptops} />
        </DialogContent>
      </Dialog>
    </>
  );
}
