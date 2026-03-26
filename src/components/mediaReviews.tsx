import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


// Correct embed URLs
const videos = [
  {
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/DU4l86XE1Q0/embed",
  },
  {
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/laceIUjYzBI?si=H54MxMyIxowYu7u4",
  },
  {
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/DUNALGZDsDm/embed",
  },
  {
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/Ov8YkzRdivE?si=LbVO1iaXF-dW2ZBD",
  },
  {
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/DIJEtdcS-Al/embed",
  },
];

export default function MediaReviews() {
  return (
    <Box sx={{ width: "100%", py: 4, bgcolor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Real Experience
      </Typography>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={"auto"}
        spaceBetween={20}
        centeredSlides={false}
        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}        pagination={{ clickable: true }}
        grabCursor={true}
        style={{
          padding: "20px 16px 40px 16px",
          overflow: "visible",
        }}
      >
        {videos.map((video, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              width: "auto",
              height: "auto",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: video.type === "youtube" ? "56.25%" : "100%",
                  height: 0,
                }}
              >
                <iframe
                  src={video.embedUrl}
                  title={`Review ${idx + 1}`}
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
