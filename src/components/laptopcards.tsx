// components/LaptopCard.tsx

import { Card, Typography, Button, Box, Rating, CardContent } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

import { getWhatsappUrl } from "../utils/contact"
import type Laptop from "../types/laptop"
import ImageCarousel from "./imageCarousel"

interface Props {
  laptop: Laptop;
  onDetails: () => void;
}
export default function LaptopCard({ laptop, onDetails }: Props) {

  return (

    <Card
      sx={{
        borderRadius: 3,
        p: 2,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)"
        }
      }}
    >

      {/* IMAGE */}
       <Box sx={{ textAlign: "center", mb: 2, height: { xs: 210, sm: 180 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
         <ImageCarousel images={laptop.imgUrl} />
       </Box>
      <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* NAME */}
        <Typography
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3rem",
          }}
        >
          {laptop.name}
        </Typography>

        {/* SPECS */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.6rem",
          }}
        >
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
          {Number(laptop.rating || 4).toFixed(1)}
        </Typography>
      </Box>

      {/* PRICE */}
      <Typography sx={{ mt: 1, fontWeight: 600 }}>
        ₹{(laptop.offerPrice || laptop.price)?.toLocaleString()}
      </Typography>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 2, flexDirection: { xs: "column", sm: "row" } }}>

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
