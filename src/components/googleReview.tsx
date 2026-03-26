import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Typography } from "@mui/material";

import Box from "@mui/material/Box";
import "../css/googleReview.css"; // we'll add the CSS below

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
    const reviews = [
      review1, review2, review3, review4, review5,
      review6, review7, review8, review9, review10,
    ];
  
    const sizeClasses = ["size-small", "size-medium", "size-large", "size-wide", "size-tall"];
  
    return (
        <>  
        
    <Box sx={{ py: 4, backgroundColor: "#f9f9f9", overflowX: "clip" }}>
    <Box className="review-section" >
              <Typography variant="h4" align="center"
        sx={{ mb: 4, fontWeight: 600 }}>
                 <span>Reviews</span>
              </Typography>
          </Box>  
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        grabCursor={true}
        style={{ padding: "20px 0 40px 0", overflow: "visible" }}
      >
        {reviews.map((src, index) => {
          const sizeClass = sizeClasses[index % sizeClasses.length];
          return (
            <SwiperSlide
              key={index}
              style={{ width: "auto", overflow: "visible" }}
            >
              <div className={`review-card-container ${sizeClass}`}>
                <div className="review-card">
                  <img src={src} alt={`Google review ${index + 1}`} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
        </>
  );
}