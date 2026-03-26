// components/LaptopCard.tsx

import { Card, Typography, Button, Box, Rating, CardContent } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

import { getWhatsappUrl } from "../utils/contact"
import type Laptop from "../types/laptop"
import ImageCarousel from "./imageCarousel"

interface Props {
  laptop: Laptop;
  onDetails: () => void;
};
export default function LaptopCard({ laptop, onDetails }: Props) {

  return (

    <Card
      sx={{
        borderRadius: 3,
        p: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)"
        }
      }}
    >

      {/* IMAGE */}
      <Box sx={{ textAlign: "center", mb: 2, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
         <ImageCarousel images={laptop.imgUrl} /> 
      </Box>
      <CardContent sx={{ p: 0 }}>
        {/* NAME */}
        <Typography fontWeight={600}>
          {laptop.name}
        </Typography>

        {/* SPECS */}
        <Typography variant="body2" color="text.secondary">
          {laptop.processor}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {laptop.ram}
        </Typography>
      </CardContent>
      {/* RATING */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Rating value={laptop.rating || 4} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({laptop.reviews || 120})
        </Typography>
      </Box>

      {/* PRICE */}
      <Typography sx={{ mt: 1, fontWeight: 600 }}>
        ₹{laptop.price?.toLocaleString()}
      </Typography>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>

        <Button
          variant="outlined"
          fullWidth
          onClick={onDetails}
        >
          Details
        </Button>

        <Button
          variant="contained"
          color="success"
          fullWidth
          href={getWhatsappUrl(laptop.name)}
          target="_blank"
          startIcon={<WhatsAppIcon />}
        >
          Buy
        </Button>

      </Box>

    </Card>
  )
}