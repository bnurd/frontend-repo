import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

if (process.env.USE_EMULATOR === "true") {
  console.log("Using Firebase SDK with Firestore emulator");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestore, "localhost", 9898);
}

export { auth, firestore };
export default firebaseApp;
