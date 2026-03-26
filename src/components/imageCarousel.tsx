// components/ImageCarousel.tsx

import { useState } from "react"
import { Box, IconButton } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

interface Props {
  images: string | string[];
  height?: number | string; // ADDED: optional height prop
}

export default function ImageCarousel({ images, height = 180 }: Props) { // CHANGED: default height 180 for card

  const imageArray = Array.isArray(images) ? images : [images];
  const [index, setIndex] = useState(0)

  const prev = () => {
    if (imageArray.length <= 1) return;
    setIndex((prev) => prev === 0 ? imageArray.length - 1 : prev - 1)
  }

  const next = () => {
    if (imageArray.length <= 1) return;
    setIndex((prev) => prev === imageArray.length - 1 ? 0 : prev + 1)
  }

  if (!imageArray || imageArray.length === 0 || imageArray[0] === '') {
    return (
      <Box
        sx={{
          width: "100%",
          height: height, // CHANGED: use height prop
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: "#fafafa",
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          color: '#888'
        }}
      >
        No Image
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          height: height, // CHANGED: use height prop
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fafafa'
        }}
      >
        <img
          src={imageArray[index]}
          alt={`Laptop view ${index + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain"
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = '<div style="color:#888;">Image Error</div>';
            }
          }}
        />

        {imageArray.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              size="small"
              sx={{
                position: "absolute",
                left: 5,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.8)",
                '&:hover': { background: "#fff" },
                padding: '4px'
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={next}
              size="small"
              sx={{
                position: "absolute",
                right: 5,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.8)",
                '&:hover': { background: "#fff" },
                padding: '4px'
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnails - only show if more than 1 image and not in card mode */}
      {imageArray.length > 1 && height !== 180 && ( // CHANGED: hide thumbnails in card mode
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            overflowX: "auto",
            pb: 1
          }}
        >
          {imageArray.map((img, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              sx={{
                border: index === i ? "2px solid #1976d2" : "1px solid #ddd",
                borderRadius: 2,
                cursor: "pointer",
                p: 0.5,
                flexShrink: 0,
                width: 60,
                height: 45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5'
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: "contain"
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}