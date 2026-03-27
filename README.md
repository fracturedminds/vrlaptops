# VR Laptops World (Frontend)

React + TypeScript + Vite website for showcasing and managing refurbished laptops.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create local env from example:

```bash
cp .env.example .env
```

3. Fill all values in `.env`.

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Required Env Vars

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

## Notes

- This root app is now frontend-only.
- The `server/` directory may still exist but is not required to run the UI.
