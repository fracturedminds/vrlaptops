import { Box, Typography } from '@mui/material';
import { brands } from '../data/brands';
import '../css/brands.css';

export default function Brands() {
  return (
    <Box className="brands-section">
      <Box className="brands-inner">
        <Typography variant="h4" className="brands-title">
          Our <span>Brands</span>
        </Typography>

        <Box className="brands-slider">
          <Box className="brands-track">
            {[...brands, ...brands].map((brand, index) => (
              <Box className="brand-item" key={index}>
                <img src={brand.image} alt={brand.name} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
