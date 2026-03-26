import {  Dialog, DialogContent, DialogTitle, Typography, Grid,  Box, Rating, Button, Chip, Divider, IconButton} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import ImageCarousel from "./imageCarousel"
import type  Laptop  from "../types/laptop"
import { getWhatsappUrl } from "../utils/contact"


interface Props {
  open: boolean;
  onClose: () => void;
  laptop: Laptop | null;
}

export default function LaptopDetailsDialog({ open, onClose, laptop }: Props) {
  if (!laptop) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      scroll="body"
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Product Details</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* LEFT - IMAGES */}
          <Grid item xs={12} md={6}>
            <ImageCarousel images={laptop.imgUrl || []} />
          </Grid>

          {/* RIGHT - DETAILS */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {laptop.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={laptop.rating || 4} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({laptop.reviews || 0} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              ₹{laptop.price?.toLocaleString()}
            </Typography>

            {laptop.inStock !== undefined && (
              <Chip 
                label={laptop.inStock ? "In Stock" : "Out of Stock"} 
                color={laptop.inStock ? "success" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
            )}

            <Divider sx={{ my: 2 }} />

            {/* SPECIFICATIONS */}
            <Typography variant="h6" gutterBottom>Specifications</Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">Processor</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{laptop.processor}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">RAM</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{laptop.ram}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">Storage</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{laptop.disk}</Typography>
                </Grid>

                {laptop.screenSize && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">Display</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{laptop.screenSize}</Typography>
                    </Grid>
                  </>
                )}

                {laptop.brand && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">Brand</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{laptop.brand}</Typography>
                    </Grid>
                  </>
                )} 
              </Grid>
            </Box>

            {/* DESCRIPTION */}
            {laptop.description && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body2" paragraph>
                  {laptop.description}
                </Typography>
              </>
            )}

            {/* BUY BUTTON */}
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              href={getWhatsappUrl(laptop.name)}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              disabled={laptop.inStock === false}
            >
              Buy on WhatsApp
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}