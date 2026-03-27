
import { useEffect, useMemo, useState } from "react"
import { Grid, Typography, Alert, CircularProgress, Box, TextField, InputAdornment } from "@mui/material"
import LaptopCard from "../components/laptopcards"
import LaptopDetails from "../components/laptopdetails"
import { getAllLaptops } from "../services/laptopservice"
import type Laptop from "../types/laptop"
import Layout from "../components/layout"
import SearchIcon from "@mui/icons-material/Search";

export default function LaptopsPage() {

const [laptops,setLaptops] = useState<Laptop[]>([])
const [selected,setSelected] = useState<Laptop| null>(null)
const [openDialog,setOpenDialog] = useState(false)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [search, setSearch] = useState("")

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

const filteredLaptops = useMemo(() => {
  const term = search.trim().toLowerCase();
  if (!term) return laptops;

  const toSearchText = (value: unknown) => String(value ?? "").toLowerCase();

  return laptops.filter((laptop) =>
    [
      laptop.name,
      laptop.brand,
      laptop.processor,
      laptop.ram,
      laptop.disk,
      laptop.screenSize,
      laptop.tag,
      laptop.description,
    ]
      .map((field) => toSearchText(field))
      .some((field) => field.includes(term))
  );
}, [laptops, search]);

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
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "95%", lg: "95%", xl: "1480px" },
        mx: "auto",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Typography variant="h4" sx={{ mb: 1.8, fontWeight: 600, fontSize: { xs: "1.65rem", sm: "2rem" } }}>
        Refurbished Laptops
      </Typography>

      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name, brand, processor, RAM..."
        fullWidth
        size="small"
        sx={{
          mb: 3,
          maxWidth: { xs: "100%", sm: 460 },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "#fff",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {laptops.length === 0 ? (
        <Alert severity="info">No laptops available at the moment.</Alert>
      ) : filteredLaptops.length === 0 ? (
        <Alert severity="info">No laptops found for “{search}”. Try another keyword.</Alert>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="stretch">
          {filteredLaptops.map((laptop) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={laptop.id} sx={{ display: "flex" }}>
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
    </Box>
    </Layout>
  </>
)
}
