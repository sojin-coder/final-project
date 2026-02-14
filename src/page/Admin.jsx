// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../data/firebase";
// import { db } from "../data/firebase";
// import { doc, setDoc } from "firebase/firestore";


// import { 
//   signInWithEmailAndPassword,
//   onAuthStateChanged 
// } from "firebase/auth";

// const ADMIN_EMAIL = ["jing@gmail.com","raksa@gmail.com"];

// const Admin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // ឆែកមើលថាតើ Email របស់ User មាននៅក្នុងបញ្ជី Admin ដែរឬទេ
//       if (ADMIN_EMAIL.includes(user.email)) {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }
//     }
//   });

//   return () => unsubscribe();
// }, [navigate]);


//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const userEmail = userCredential.user.email;

//     // ✅ Role Check ដោយប្រើ Array includes
//     if (ADMIN_EMAIL.includes(userEmail)) {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/user/dashboard");
//     }

//   } catch (error) {
//     // ... code error handling របស់អ្នកទុកដដែល ...
//     setError("Login failed!"); 
//   }
//   setLoading(false);
// };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-lg w-96"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Login System
//         </h1>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 border rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 border rounded mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Admin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../data/firebase";
// // import { auth, } from "../data/firebase";

// import {
//   signInWithEmailAndPassword
// } from "firebase/auth";

// import {
//   doc,
//   getDoc,
//   updateDoc,
//   setDoc
// } from "firebase/firestore";

// const Admin = () => {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);


//   const handleLogin = async (e) => {

//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {

//       const userCredential =
//         await signInWithEmailAndPassword(auth, email, password);

//       const user = userCredential.user;

//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       // 🔥 First Login → create user doc
//       if (!userSnap.exists()) {

//         await setDoc(userRef, {
//           email: user.email,
//           role: "user", // default
//           createdAt: new Date(),
//           lastLogin: new Date()
//         });

//         navigate("/user/dashboard");
//         return;
//       }

//       // ✅ Update last login
//       await updateDoc(userRef, {
//         lastLogin: new Date()
//       });

//       const role = userSnap.data().role;

//       // ✅ Redirect by role
//       if (role === "admin") {

//         navigate("/admin/dashboard");

//       } else {

//         navigate("/user/dashboard");

//       }

//     } catch (err) {

//       setError("Invalid Email or Password");

//     }

//     setLoading(false);
//   };


//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-lg w-96"
//       >

//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Secure Login
//         </h1>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 border rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 border rounded mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//       </form>
//     </div>
//   );
// };

// export default Admin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const Admin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      // ✅ Login Firebase
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // ✅ Get Firestore user
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // ❌ Block if no account in Firestore
      if (!userSnap.exists()) {

        setError("Account not found. Please signup first.");
        setLoading(false);
        return;
      }

      // ✅ Update last login (use server time 🔥)
      await updateDoc(userRef, {
        lastLogin: serverTimestamp()
      });

      const role = userSnap.data().role;

      // ✅ Redirect safely
      if (role === "admin") {

        navigate("/admin/dashboard");

      } 
      else if (role === "user") {

        navigate("/home");

      } 
      else if (role === "pending") {

        setError("Your account is waiting for admin approval.");
        
      } 
      else {

        setError("Access denied.");

      }

    } catch (err) {

      setError("Invalid Email or Password");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Secure Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Admin;
