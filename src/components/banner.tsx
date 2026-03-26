import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Box from '@mui/material/Box';
import '../../node_modules/swiper/swiper.min.css';
import '../../node_modules/swiper/modules/pagination.css';

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import VerifiedIcon from "@mui/icons-material/Verified";
import '../css/banner.css';
import banner1 from "../assets/banner1.png";
// import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

export default function Banner() {
  const banners = [banner1, banner3];

  // Counter states
  const [happyCount, setHappyCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const targetHappy = 1000;
  const targetDelivered = 900;

  // Visibility tracking
  const [isVisible, setIsVisible] = useState(false);
  const trustRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // adjust as needed
    );

    if (trustRef.current) {
      observer.observe(trustRef.current);
    }

    return () => {
      if (trustRef.current) {
        observer.unobserve(trustRef.current);
      }
    };
  }, []);

  // Animation logic based on visibility
  useEffect(() => {
    // If not visible, cancel any running animation
    if (!isVisible) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      return;
    }

    // Reset counters to 0 when becoming visible
    setHappyCount(0);
    setDeliveredCount(0);

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setHappyCount(Math.floor(progress * targetHappy));
      setDeliveredCount(Math.floor(progress * targetDelivered));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = undefined;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isVisible, targetHappy, targetDelivered]);

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "1400px", position: "relative", mb: "20px" }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          grabCursor={false}
          style={{ width: "100%", height: "auto" }}
        >
          {banners.map((src, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "21/9",
                  overflow: "hidden",
                }}
              >
                <img
                  src={src}
                  alt={`Banner ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Trust Section with Animated Counters */}
      <div ref={trustRef} className="trust-container">
        <div className="trust-item">
          <SentimentSatisfiedAltIcon className="trust-icon" />
          <p>{happyCount}+ Happy Customers</p>
        </div>
        <div className="trust-item">
          <LocalShippingIcon className="trust-icon" />
          <p>{deliveredCount}+ Delivered</p>
        </div>
        <div className="trust-item">
          <VerifiedIcon className="trust-icon" />
          <p>Lifetime Service</p>
        </div>
      </div>
    </>
  );
}