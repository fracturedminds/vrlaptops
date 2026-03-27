import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/firebase"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type Laptop from "../types/laptop"

import ImageCarousel from "./imageCarousel"
import LaptopDetailsDialog from "./laptopdetails"
import { getWhatsappUrl } from "../utils/contact"

export default function FeaturedLaptops() {
  const navigate = useNavigate()
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchLaptops()
  }, [])

  const fetchLaptops = async () => {
    const snapshot = await getDocs(collection(db, "laptops"))

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Laptop[];

    setLaptops(data.slice(0, 4))
  }

  const handleOpenDialog = (laptop: Laptop) => {
    setSelectedLaptop(laptop)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setTimeout(() => setSelectedLaptop(null), 300)
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "95%", lg: "95%", xl: "1480px" },
        mx: "auto",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, fontSize: { xs: "1.65rem", sm: "2rem" } }}>
        Explore Refurbished Laptops
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="stretch">
        {laptops.map((laptop) => (
          <Grid item xs={12} sm={6} lg={3} key={laptop.id} sx={{ display: "flex" }}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                borderRadius: 3,
                transition: "all 0.25s ease",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "1px solid #1976d2"
                }
              }}
              onClick={() => handleOpenDialog(laptop)}
            >
              <Box sx={{ position: "relative" }}>
                {laptop.featured && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "#ff9800",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "12px",
                      fontWeight: 600,
                      zIndex: 1
                    }}
                  >
                    FEATURED
                  </Box>
                )}
                <CardMedia sx={{ height: { xs: 200, sm: 180 } }}>
                  <ImageCarousel images={laptop.imgUrl} />
                </CardMedia>
              </Box>
              <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.6rem",
                  }}
                >
                  {laptop.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.75rem",
                  }}
                >
                  {laptop.processor} | {laptop.ram} | {laptop.disk}
                </Typography>

                <Typography variant="h6" sx={{ mt: 1.5, mb: 2 }}>
                  ₹{laptop.offerPrice || laptop.price}
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<WhatsAppIcon />}
                  target="_blank"
                  href={getWhatsappUrl(laptop.name)}
                  onClick={(e) => e.stopPropagation()}
                  sx={{ mt: "auto" }}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/laptops")}
        >
          More
        </Button>
      </Box>

      <LaptopDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        laptop={selectedLaptop}
      />
    </Box>
  )
}
