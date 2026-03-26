import { useState } from "react";
import type { ChangeEvent } from "react";

import { uploadImage } from "../services/cloudinaryServices";
import { addLaptop, updateLaptop } from "../services/laptopservice";

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface LaptopFormProps {
  closeForm: () => void;
  editLaptop?:any
}



export default function LaptopForm({ closeForm, editLaptop }: LaptopFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    brand: editLaptop?.brand || "",
  name: editLaptop?.name || "",
  quantity: editLaptop?.quantity || 0,
  description: editLaptop?.description || "",
  discount: editLaptop?.discount || 0,
  disk: editLaptop?.disk || "",
  featured: editLaptop?.featured || false,
  inStock: editLaptop?.inStock ?? true,
  offerPrice: editLaptop?.offerPrice || 0,
  price: editLaptop?.price || 0,
  processor: editLaptop?.processor || "",
  ram: editLaptop?.ram || "",
  screenSize: editLaptop?.screenSize || "",
  tag: editLaptop?.tag || "",
  imgUrl: editLaptop?.imgUrl || [],
  createdAt: editLaptop?.createdAt || new Date(),
  updatedAt: new Date(),
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" } | null>(null)
  
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev)=>({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrls = [...form.imgUrl]; 
      if (files.length > 0) {
        const uploadPromises = files.map(file => uploadImage(file))
        const newImageUrls = await Promise.all(uploadPromises)
        imageUrls = [...imageUrls, ...newImageUrls]; 
        console.log("New images uploaded:", newImageUrls); 
      }
    const payload = {
      ...form,
      price: Number(form.price),
      offerPrice: Number(form.offerPrice),
      discount: Number(form.discount),
      quantity: Number(form.quantity),
      imgUrl: imageUrls.length ? imageUrls : form.imgUrl,
      updatedAt: new Date()
    }

    if (editLaptop) {

      // UPDATE
      await updateLaptop(editLaptop.id, payload)

      setSnackbar({
        open:true,
        message:"Laptop Updated Successfully!",
        severity:"success"
      })

    } else {

      // ADD
      await addLaptop({
        ...payload,
        createdAt:new Date()
      })

      setSnackbar({
        open:true,
        message:"Laptop Added Successfully!",
        severity:"success"
      })
    }

    setTimeout(()=>closeForm(),2000)

  } catch(error){
    console.error(error)

    setSnackbar({
      open:true,
      message:"Operation Failed",
      severity:"error"
    })
  }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Brand" name="brand"value={form.brand} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Processor" name="processor" value={form.processor} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="RAM" name="ram" value={form.ram} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Disk" name="disk" value={form.disk} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Screen Size" name="screenSize" value={form.screenSize} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Offer Price" name="offerPrice" type="number"value={form.offerPrice} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Discount" name="discount" type="number" value={form.discount} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={4} />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
  <InputLabel>Tag</InputLabel>

  <Select label="Tag" name="tag" value={form.tag} onChange={handleChange}>
    <MenuItem value="business">Business</MenuItem>
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="lightweight">Lightweight</MenuItem>
    <MenuItem value="gaming">Gaming</MenuItem>
  </Select>

</FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="featured" checked={form.featured} onChange={handleChange} />}
            label="Featured"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="inStock" checked={form.inStock} onChange={handleChange} />}
            label="In Stock"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" component="label">
            Upload Images
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          {files.length > 0 && <span>{files.length} files selected</span>}
        </Grid>

        <Grid item xs={12}>
        <Button 
              onClick={closeForm}
              variant="outlined"
              color="inherit"
              sx={{ mr: 2 }} 
            >  Cancel
            </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editLaptop? "Save Chanmges" : "Add Laptop"}
           
          </Button>
        </Grid>

      </Grid>
      {snackbar && (
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
