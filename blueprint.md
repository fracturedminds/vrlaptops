# Project Blueprint

## Overview

This project is a full-stack application with a React frontend and a NestJS backend.

## Frontend

* **Framework:** React
* **Build Tool:** Vite
* **Language:** TypeScript

## Backend

* **Framework:** NestJS
* **Language:** TypeScript

## Implemented Features

* **NestJS Backend Integration:** A NestJS backend has been set up in the `server` directory. The project has been configured to run both the frontend and backend concurrently. API requests from the frontend to `/api` are proxied to the NestJS backend.
* **Firebase Integration:** Firestore and Firebase Storage have been initialized.

## Firebase Integration Plan

### 1. Configure Firebase SDK

First, you need to get your Firebase project's configuration and add it to your project.

*   **Log in to Firebase:** If you haven't already, run `firebase login` in your terminal and follow the instructions.
*   **Select a Firebase Project:** Run `firebase use --add` to select an existing project or `firebase projects:create` to create a new one.
*   **Get SDK Configuration:** Run `firebase apps:sdkconfig WEB` to get your web app's configuration.
*   **Create `src/services/firebase.ts`:** Create this file and add the following code, replacing the placeholders with your actual configuration:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 2. Using Firestore

You can now use Firestore to store and retrieve data. Here's an example of how to add a new laptop document to a "laptops" collection.

*   **Create `src/services/laptopservice.ts`:**

```typescript
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Laptop } from "../types/laptop"; // Assuming you have a type definition for Laptop

export const createLaptop = async (laptopData: Laptop) => {
  try {
    const docRef = await addDoc(collection(db, "laptops"), laptopData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
```

### 3. Using Firebase Storage

You can use Firebase Storage to upload and manage files. Here's an example of how to upload an image.

*   **Create `src/services/storageservice.ts`:**

```typescript
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImage = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!", snapshot);
    return snapshot;
  } catch (e) {
    console.error("Error uploading file: ", e);
    return null;
  }
};
```
