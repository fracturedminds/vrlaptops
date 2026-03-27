import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import realExpLinks from "../data/realexp.json";
import "../css/mediaReviews.css";

interface RealExperienceVideo {
  source: "instagram" | "youtube";
  thumbnail?: string;
  previewEmbedUrl?: string;
  watchUrl?: string;
  embedUrl: string;
}

const getInstagramCode = (url: string): string | null => {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
  return match ? match[1] : null;
};

const getYoutubeCode = (url: string): string | null => {
  const shortMatch = url.match(/youtube\.com\/shorts\/([^/?#]+)/i);
  if (shortMatch) return shortMatch[1];

  const watchMatch = url.match(/[?&]v=([^&]+)/i);
  if (watchMatch) return watchMatch[1];

  const youtuMatch = url.match(/youtu\.be\/([^/?#]+)/i);
  if (youtuMatch) return youtuMatch[1];

  return null;
};

const buildYoutubeEmbedUrl = (videoCode: string) => {
  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoCode}`);
  embedUrl.searchParams.set("autoplay", "1");
  embedUrl.searchParams.set("playsinline", "1");
  embedUrl.searchParams.set("rel", "0");
  embedUrl.searchParams.set("modestbranding", "1");
  embedUrl.searchParams.set("iv_load_policy", "3");

  if (typeof window !== "undefined") {
    embedUrl.searchParams.set("origin", window.location.origin);
  }

  return embedUrl.toString();
};

const buildVideo = (url: string): RealExperienceVideo | null => {
  const instagramCode = getInstagramCode(url);
  if (instagramCode) {
    return {
      source: "instagram",
      previewEmbedUrl: `https://www.instagram.com/reel/${instagramCode}/embed`,
      embedUrl: `https://www.instagram.com/reel/${instagramCode}/embed`,
    };
  }

  const youtubeCode = getYoutubeCode(url);
  if (youtubeCode) {
    return {
      source: "youtube",
      thumbnail: `https://img.youtube.com/vi/${youtubeCode}/hqdefault.jpg`,
      watchUrl: `https://www.youtube.com/watch?v=${youtubeCode}`,
      embedUrl: buildYoutubeEmbedUrl(youtubeCode),
    };
  }

  return null;
};

export default function MediaReviews() {
  const [selectedVideo, setSelectedVideo] = useState<RealExperienceVideo | null>(null);
  const [brokenThumbs, setBrokenThumbs] = useState<Record<string, boolean>>({});

  const videos = useMemo(
    () => realExpLinks.map((link) => buildVideo(link)).filter((item): item is RealExperienceVideo => item !== null),
    []
  );

  return (
    <Box className="realexp-block">
      <Box className="realexp-header">
        <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 600 }}>
          Real Experiences
        </Typography>
      </Box>

      <Swiper
        className="realexp-carousel"
        modules={[Autoplay, Pagination]}
        slidesPerView={1.2}
        spaceBetween={10}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 2600,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          420: { slidesPerView: 1.4, spaceBetween: 10 },
          600: { slidesPerView: 2.1, spaceBetween: 12 },
          900: { slidesPerView: 3, spaceBetween: 12 },
          1200: { slidesPerView: 3.6, spaceBetween: 14 },
        }}
      >
        {videos.map((video, idx) => (
          <SwiperSlide key={`${video.embedUrl}-${idx}`}>
            <Box
              className="realexp-card"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVideo(video)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setSelectedVideo(video);
                }
              }}
            >
              {video.source === "instagram" ? (
                <Box
                  component="iframe"
                  src={video.previewEmbedUrl}
                  title={`Instagram reel preview ${idx + 1}`}
                  className="realexp-instagram-preview"
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              ) : !brokenThumbs[video.embedUrl] ? (
                <Box
                  component="img"
                  src={video.thumbnail}
                  alt={`Real experience ${idx + 1}`}
                  className="realexp-thumbnail"
                  onError={() =>
                    setBrokenThumbs((prev) => ({
                      ...prev,
                      [video.embedUrl]: true,
                    }))
                  }
                />
              ) : (
                <Box className="realexp-thumbnail-fallback">
                  <Typography variant="body2" fontWeight={600}>
                    Preview unavailable
                  </Typography>
                </Box>
              )}
              {video.source === "youtube" && (
                <Box className="realexp-play-overlay">
                  <PlayCircleOutlineIcon sx={{ fontSize: 48 }} />
                </Box>
              )}
              <Box className="realexp-source-chip">
                {video.source === "instagram" ? "Reel" : "Short"}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ className: "realexp-modal-paper" }}
        BackdropProps={{ className: "realexp-modal-backdrop" }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Typography variant="h6">Real Experience</Typography>
          <IconButton onClick={() => setSelectedVideo(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {selectedVideo && (
            <Box className="realexp-embed-wrap">
              <iframe
                src={selectedVideo.embedUrl}
                title="Real Experience video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="realexp-iframe"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </Box>
          )}
          {selectedVideo?.source === "youtube" && selectedVideo.watchUrl && (
            <Typography variant="body2" sx={{ mt: 1.25, textAlign: "center" }}>
              If player fails,{" "}
              <a href={selectedVideo.watchUrl} target="_blank" rel="noreferrer">
                open this Short directly on YouTube
              </a>
              .
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
