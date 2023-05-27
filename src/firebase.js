import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7yav0DcPnzxnNgDqEa7o203KpDXe6QA0",
  authDomain: "chat-realtime-88a9b.firebaseapp.com",
  projectId: "chat-realtime-88a9b",
  storageBucket: "chat-realtime-88a9b.appspot.com",
  messagingSenderId: "680020910406",
  appId: "1:680020910406:web:7240d73058aa5187ee0547",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
