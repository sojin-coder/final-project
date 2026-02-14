import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../data/firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault();

    if(password.length < 6){
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    setError("");

    try {

      // ✅ Create Firebase Auth user
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // ✅ Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        email,
        role: "user",
        createdAt: serverTimestamp()
      });

      // 🔥 Auto Login → go dashboard
      navigate("/user/dashboard");

    } catch (err) {

      if(err.code === "auth/email-already-in-use"){
        setError("Email already in use");
      }else{
        setError("Signup failed. Try again.");
      }

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded mb-4"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded mb-4"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Go Login */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={()=>navigate("/admin")}
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
};

export default Signup;
