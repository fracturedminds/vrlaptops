# Project Blueprint

## Overview

This project is a **frontend-only** React + TypeScript website for VR Laptops World, built with Vite and integrated directly with Firebase services from the client.

## Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** MUI
- **Data/Storage:** Firebase Firestore + Firebase Storage + Cloudinary uploads

## Current Implemented Features

- Home page with:
  - responsive sticky navbar
  - banner carousel with trust counters
  - featured laptops section
  - customer reviews carousel
  - brands carousel
  - FAQ and footer
- Laptops listing page with card grid and details dialog
- Admin page with local credential gate via `.env`
- Client-side Firebase CRUD for laptop inventory
- Cloudinary image upload integration via `.env`

## Environment Configuration

All runtime configuration is sourced from Vite env variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`

## Latest UI & Architecture Update

### Problem Addressed

- Website had inconsistent spacing and margins
- Banner and trust strip had alignment/overflow issues
- Reviews section was visually unstable and misaligned
- Laptop cards became uneven with variable content
- Frontend depended on unnecessary backend auth/proxy setup

### Changes Made

- Added global layout reset and consistent page container behavior
- Refined navbar sizing, spacing, and responsive behavior
- Reworked banner and trust strip alignment for all screen sizes
- Rebuilt reviews carousel styling for stable consistent cards
- Standardized featured and listing cards with:
  - equal-height layout
  - text clamping
  - stable button alignment
- Removed frontend backend coupling:
  - removed API proxy from `vite.config.ts`
  - removed backend scripts from root `package.json`
  - removed `src/services/api.ts`
  - switched admin login to local `.env`-based credential validation
- Moved hardcoded Firebase and Cloudinary values to `import.meta.env`
- Added `src/vite-env.d.ts` and `.env.example`

### Notes

- The `server/` folder is left intact but no longer required for frontend runtime.
- Root project now runs as client-only (`vite` + TypeScript build).
