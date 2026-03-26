import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/firebase"
import { useNavigate } from "react-router-dom" // ADDED for navigation

import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type Laptop from "../types/laptop"

import ImageCarousel from "./imageCarousel"
import LaptopDetailsDialog from "./laptopdetails" 
import { getWhatsappUrl } from "../utils/contact"

export default function FeaturedLaptops() {
  const navigate = useNavigate() // ADDED
  const [laptops, setLaptops] = useState<Laptop[]>([])
  // ADDED dialog state
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

    setLaptops(data.slice(0, 4)) // only 4 laptops
  }

  // ADDED handler for opening dialog
  const handleOpenDialog = (laptop: Laptop) => {
    setSelectedLaptop(laptop)
    setDialogOpen(true)
  }

  // ADDED handler for closing dialog
  const handleCloseDialog = () => {
    setDialogOpen(false)
    // Optional: clear selected laptop after dialog closes
    setTimeout(() => setSelectedLaptop(null), 300)
  }

  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Explore Refurbished Laptops
      </Typography>

      <Grid container spacing={3}>
        {laptops.map((laptop) => (
          <Grid item xs={12} sm={6} md={3} key={laptop.id}>
            <Card
              sx={{
                height: "100%",
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
              // CHANGED: Make entire card clickable to open dialog
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
                      zIndex: 1 // Ensure it appears above image
                    }}
                  >
                    FEATURED
                  </Box>
                )}
                <CardMedia sx={{ height: 180 }}>
                  <ImageCarousel images={laptop.imgUrl} />
                </CardMedia>
              </Box>
              <CardContent>
                <Typography variant="h6">
                  {laptop.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {laptop.processor} | {laptop.ram} | {laptop.disk}
                </Typography>

                <Typography variant="h6" sx={{ mt: 1 }}>
                  ₹{laptop.offerPrice || laptop.price}
                </Typography>

                {/* CHANGED: Prevent click event from bubbling to card */}
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<WhatsAppIcon />}
                  target="_blank"
                  href={getWhatsappUrl(laptop.name)}
                  onClick={(e) => e.stopPropagation()} // ADDED: Prevent card click
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/laptops")}
        >
          More
        </Button>
      </div>

      {/* ADDED: Details Dialog */}
      <LaptopDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        laptop={selectedLaptop}
      />
    </div>
  )
}