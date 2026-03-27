import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { uploadImage } from "../services/cloudinaryServices";
import { addLaptop, updateLaptop } from "../services/laptopservice";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type Laptop from "../types/laptop";

interface LaptopFormProps {
  closeForm: () => void;
  editLaptop?: Laptop | null;
  onSaved?: () => Promise<void> | void;
}

type LaptopFormState = Omit<Laptop, "id" | "rating">;
type LaptopCreatePayload = Omit<Laptop, "id">;

const getInitialForm = (editLaptop?: Laptop | null): LaptopFormState => ({
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

export default function LaptopForm({ closeForm, editLaptop, onSaved }: LaptopFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState<LaptopFormState>(getInitialForm(editLaptop));
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(editLaptop?.rating ?? 4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clampRating = (value: number) => Math.min(5, Math.max(0, value));

  useEffect(() => {
    setFiles([]);
    setForm(getInitialForm(editLaptop));
    setRating(editLaptop?.rating ?? 4);
  }, [editLaptop]);

  const selectedFilePreviews = useMemo(
    () => files.map((file) => ({ fileName: file.name, previewUrl: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => {
      selectedFilePreviews.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [selectedFilePreviews]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const isCheckbox = "type" in e.target && e.target.type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      imgUrl: prev.imgUrl.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let imageUrls = [...form.imgUrl];

      if (files.length > 0) {
        const uploadPromises = files.map((file) => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const payload: LaptopCreatePayload = {
        ...form,
        price: Number(form.price),
        offerPrice: Number(form.offerPrice),
        discount: Number(form.discount),
        quantity: Number(form.quantity),
        rating: Number(rating || 0),
        imgUrl: imageUrls,
        updatedAt: new Date(),
      };

      if (editLaptop) {
        await updateLaptop(editLaptop.id, payload);
        setSnackbar({
          open: true,
          message: "Laptop updated successfully!",
          severity: "success",
        });
      } else {
        await addLaptop({
          ...payload,
          createdAt: new Date(),
        });
        setSnackbar({
          open: true,
          message: "Laptop added successfully!",
          severity: "success",
        });
      }

      await onSaved?.();
      closeForm();
    } catch (error) {
      console.error("Laptop form submission failed:", error);
      setSnackbar({
        open: true,
        message: "Operation failed",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Brand" name="brand" value={form.brand} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Processor" name="processor" value={form.processor} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="RAM" name="ram" value={form.ram} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Disk" name="disk" value={form.disk} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Screen Size" name="screenSize" value={form.screenSize} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Offer Price" name="offerPrice" type="number" value={form.offerPrice} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Discount" name="discount" type="number" value={form.discount} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={1}
            sx={{ minHeight: "56px", px: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 46 }}>
                Rating
              </Typography>
              <Rating
                value={rating}
                precision={0.5}
                onChange={(_, value) => setRating(clampRating(value ?? 0))}
              />
            </Box>
            <TextField
              label="Value"
              type="number"
              size="small"
              value={rating}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isNaN(value)) return;
                setRating(clampRating(value));
              }}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              sx={{ width: { xs: "100%", sm: 90 } }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
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
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox name="featured" checked={form.featured} onChange={handleChange} />}
            label="Featured"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox name="inStock" checked={form.inStock} onChange={handleChange} />}
            label="In Stock"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Images
            <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
          </Button>
          {files.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {files.length} new file(s) selected
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Existing Images
          </Typography>
          {form.imgUrl.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No uploaded images yet.
            </Typography>
          ) : (
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              {form.imgUrl.map((url, index) => (
                <Box key={`${url}-${index}`} sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={url}
                    alt={`Existing laptop ${index + 1}`}
                    sx={{
                      width: 92,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #ddd",
                      cursor: "zoom-in",
                    }}
                    onClick={() => setPreviewModalImage(url)}
                  />
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleRemoveExistingImage(index)}
                    sx={{
                      minWidth: 0,
                      p: 0.4,
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "#fff",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        {selectedFilePreviews.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              New Upload Previews
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              {selectedFilePreviews.map((item) => (
                <Box key={item.fileName} sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={item.previewUrl}
                    alt={item.fileName}
                    sx={{
                      width: 92,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #ddd",
                      cursor: "zoom-in",
                    }}
                    onClick={() => setPreviewModalImage(item.previewUrl)}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
        )}

        <Grid item xs={12}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <Button
              onClick={closeForm}
              variant="outlined"
              color="inherit"
              sx={{ width: { xs: "100%", sm: "auto" } }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ width: { xs: "100%", sm: "auto" } }}
              disabled={isSubmitting}
            >
              {editLaptop ? "Save Changes" : "Add Laptop"}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {snackbar && (
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        open={Boolean(previewModalImage)}
        onClose={() => setPreviewModalImage(null)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            background: "rgba(8, 11, 22, 0.45)",
          },
        }}
      >
        {previewModalImage && (
          <Box
            component="img"
            src={previewModalImage}
            alt="Laptop preview"
            sx={{
              display: "block",
              maxWidth: "min(92vw, 980px)",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: 1.5,
              boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
            }}
          />
        )}
      </Dialog>
    </>
  );
}
