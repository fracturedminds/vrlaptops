import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

import LaptopForm from "../components/laptopForm";
import LaptopList from "../components/laptopList";

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const [open, setOpen] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaved = () => {
    setRefreshSignal((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "95%", lg: "95%", xl: "1480px" },
        mx: "auto",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.7rem", sm: "2.1rem" } }}>
          Admin Panel
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add Laptop
          </Button>

          <Button
            onClick={onLogout}
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Laptop</DialogTitle>
        <DialogContent>
          <LaptopForm closeForm={handleClose} editLaptop={null} onSaved={handleSaved} />
        </DialogContent>
      </Dialog>

      <Typography variant="h6" gutterBottom sx={{ mb: 1.5 }}>
        Laptop Inventory
      </Typography>

      <LaptopList refreshSignal={refreshSignal} />
    </Box>
  );
}
