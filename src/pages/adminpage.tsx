import { useState } from "react"

import LaptopForm from "../components/laptopForm"
import LaptopList from "../components/laptopList"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps)
{
  const [open,setOpen] = useState(false)
  const [editLaptop,setEditLaptop] = useState(null)
  

  const handleOpen = ()=>{
   setOpen(true)
   setEditLaptop(null)
  }
 
  const handleClose = ()=>{
   setOpen(false)
  }
 

  return(

    <div style={{padding:"20px"}}>
       <Typography variant="h4" gutterBottom>
         Admin Panel
        </Typography>
        <Button
            variant="contained"
            onClick={handleOpen}
            sx={{mb:3}} >
           + Add Laptop
       </Button>
       <Button onClick={onLogout} variant="outlined" sx={{ m: 2 }}>Logout</Button>
 <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>

<DialogTitle>Add New Laptop</DialogTitle>

<DialogContent>

<LaptopForm closeForm={handleClose} editLaptop={editLaptop}/>

</DialogContent>

</Dialog>

{/* LAPTOP LIST */}

<Typography variant="h6" gutterBottom>
 Laptop Inventory
 </Typography>

 <LaptopList />
 
</div>

  )

}