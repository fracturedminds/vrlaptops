import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import "../css/googleReview.css";
import { useState } from "react";

import review1 from "../assets/googleReviews/r1.png";
import review2 from "../assets/googleReviews/r2.png";
import review3 from "../assets/googleReviews/r3.png";
import review4 from "../assets/googleReviews/r4.png";
import review5 from "../assets/googleReviews/r5.png";
import review6 from "../assets/googleReviews/r6.png";
import review7 from "../assets/googleReviews/r7.png";
import review8 from "../assets/googleReviews/r8.png";
import review9 from "../assets/googleReviews/r9.png";
import review10 from "../assets/googleReviews/r10.png";

export default function ReviewCarousel() {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const reviews = [
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
    review8,
    review9,
    review10,
  ];

  return (
    <Box className="reviews-block">
      <Box className="reviews-header">
        <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 600 }}>
          Reviews
        </Typography>
      </Box>

      <Swiper
        className="reviews-carousel"
        modules={[Autoplay, Pagination]}
        slidesPerView={1.2}
        spaceBetween={16}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          420: { slidesPerView: 1.4, spaceBetween: 14 },
          600: { slidesPerView: 2.1, spaceBetween: 16 },
          900: { slidesPerView: 3, spaceBetween: 18 },
          1200: { slidesPerView: 3.6, spaceBetween: 20 },
        }}
      >
        {reviews.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="review-card-container">
              <div
                className="review-card"
                onClick={() => setSelectedReview(src)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setSelectedReview(src);
                  }
                }}
              >
                <img src={src} alt={`Google review ${index + 1}`} loading="lazy" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        maxWidth="lg"
        PaperProps={{ className: "review-modal-paper" }}
        BackdropProps={{ className: "review-modal-backdrop" }}
      >
        {selectedReview && (
          <img
            src={selectedReview}
            alt="Selected review"
            className="review-modal-image"
          />
        )}
      </Dialog>
    </Box>
  );
}
