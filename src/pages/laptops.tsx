
import { useEffect, useState } from "react"
import { Grid, Typography,  Alert, CircularProgress, Box} from "@mui/material"
import LaptopCard from "../components/laptopcards"
import LaptopDetails from "../components/laptopdetails"
import { getAllLaptops } from "../services/laptopservice"
import type Laptop from "../types/laptop"
import Layout from "../components/layout"

export default function LaptopsPage() {

const [laptops,setLaptops] = useState<Laptop[]>([])
const [selected,setSelected] = useState<Laptop| null>(null)
const [openDialog,setOpenDialog] = useState(false)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(()=>{
  fetchLaptops()
},[])

const fetchLaptops = async ()=>{
  try{
    setLoading(true)
    setError(null)
    const data = await getAllLaptops()
    setLaptops(data as Laptop[])
} catch(err){
  setError("Failed to load laptops. Please try again later.")
      console.error("Error fetching laptops:", err)
    } finally {
      setLoading(false)
    }
}

const handleOpenDetails = (laptop: Laptop) => {
  setSelected(laptop)
  setOpenDialog(true)
}

const handleCloseDetails = () => {
  setOpenDialog(false)
  // Optional: Clear selected laptop after dialog closes
  // setTimeout(() => setSelectedLaptop(null), 300)
}

if (loading) {
  return (
    <Layout>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Box>
    </Layout>
  )
}

if (error) {
  return (
    <Layout>
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
    </Layout>
  )
}

return (
  <>
  <Layout>
    <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
      Refurbished Laptops
    </Typography>

    {laptops.length === 0 ? (
      <Alert severity="info">No laptops available at the moment.</Alert>
    ) : (
      <Grid container spacing={3}>
        {laptops.map((laptop) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={laptop.id}>
            <LaptopCard
              laptop={laptop}
              onDetails={() => handleOpenDetails(laptop)}
            />
          </Grid>
        ))}
      </Grid>
    )}

    <LaptopDetails
      open={openDialog}
      onClose={handleCloseDetails}
      laptop={selected}
    />
    </Layout>
  </>
)
}