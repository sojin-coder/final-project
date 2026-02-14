// // // // Import the functions you need from the SDKs you need
// // // import { initializeApp } from "firebase/app";
// // // import { getAnalytics } from "firebase/analytics";
// // // // TODO: Add SDKs for Firebase products that you want to use
// // // // https://firebase.google.com/docs/web/setup#available-libraries

// // // // Your web app's Firebase configuration
// // // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
// // //   authDomain: "my-website-cms.firebaseapp.com",
// // //   projectId: "my-website-cms",
// // //   storageBucket: "my-website-cms.firebasestorage.app",
// // //   messagingSenderId: "344143826164",
// // //   appId: "1:344143826164:web:86556e46a537b4ceade2a1",
// // //   measurementId: "G-NJ9H7R8RGY"
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);

// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth"; // ១. បន្ថែមជួរនេះ

// // const firebaseConfig = {
// //   apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
// //   authDomain: "my-website-cms.firebaseapp.com",
// //   projectId: "my-website-cms",
// //   storageBucket: "my-website-cms.firebasestorage.app",
// //   messagingSenderId: "344143826164",
// //   appId: "1:344143826164:web:86556e46a537b4ceade2a1",
// //   measurementId: "G-NJ9H7R8RGY"
// // };

// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // export const auth = getAuth(app); // ២. បន្ថែមជួរនេះ (សំខាន់បំផុត)
// // src/data/firebase.js

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";


// // កំណត់យក configuration ពី Firebase Console
// // សូមពិនិត្យថាមានត្រឹមត្រូវ
// const firebaseConfig = {
//   apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
//   authDomain: "my-website-cms.firebaseapp.com",
//   projectId: "my-website-cms",
//   storageBucket: "my-website-cms.firebasestorage.app",
//   messagingSenderId: "344143826164",
//   appId: "1:344143826164:web:86556e46a537b4ceade2a1",
//   measurementId: "G-NJ9H7R8RGY"
// };

// // ត្រួតពិនិត្យ configuration
// console.log("Firebase Config:", firebaseConfig);

// // ត្រួតពិនិត្យថាមានតម្លៃទាំងអស់
// const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
// const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

// if (missingFields.length > 0) {
//   console.error("Missing Firebase config fields:", missingFields);
//   throw new Error("Firebase configuration is incomplete");
// }

// // Initialize Firebase
// let app;
// try {
//   app = initializeApp(firebaseConfig);
//   console.log("Firebase app initialized successfully");
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
//   throw error;
// }

// // Initialize Analytics (optional)
// let analytics;
// try {
//   analytics = getAnalytics(app);
//   console.log("Analytics initialized");
// } catch (error) {
//   console.warn("Analytics initialization failed:", error);
// }

// // Initialize Auth
// export const auth = getAuth(app);
// console.log("Auth initialized:", auth);

// // Export other Firebase services if needed
// export { app };
// export default app;

// export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. ត្រូវថែមបន្ទាត់នេះ

const firebaseConfig = {
  apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
  authDomain: "my-website-cms.firebaseapp.com",
  projectId: "my-website-cms",
  storageBucket: "my-website-cms.firebasestorage.app",
  messagingSenderId: "344143826164",
  appId: "1:344143826164:web:86556e46a537b4ceade2a1",
  measurementId: "G-NJ9H7R8RGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app); // 2. បង្កើត និង export db ចេញទៅប្រើ
export const analytics = getAnalytics(app);

export default app;