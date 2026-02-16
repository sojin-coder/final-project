// src/page/Admin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, Coffee, AlertCircle, Shield, Eye, EyeOff } from "lucide-react";
import { auth } from "../data/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import AOS from "aos";
import "aos/dist/aos.css";

// List of authorized admins (must match Unauthorized page)
const AUTHORIZED_ADMINS = [
  "raksa@gmail.com",
  "jing@gmail.com",
  "sophoeurs668@gmail.com"
];

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User already logged in:", user.email);
        
        // Check if user is authorized admin
        if (AUTHORIZED_ADMINS.includes(user.email)) {
          console.log("✅ Authorized admin detected");
          
          // Update last login in Firestore
          try {
            await setDoc(doc(db, "users", user.uid), {
              lastLogin: new Date().toISOString()
            }, { merge: true });
          } catch (error) {
            console.error("Error updating last login:", error);
          }
          
          navigate(from, { replace: true });
        } else {
          console.log("❌ Unauthorized user");
          // Sign out unauthorized user
          await auth.signOut();
          setError("You are not authorized to access the admin area");
        }
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [navigate, from]);

  // Create or update user in Firestore
  const createUserInFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      const userData = {
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        role: "admin",
        isAuthorized: AUTHORIZED_ADMINS.includes(user.email),
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (!userDoc.exists()) {
        // New user
        await setDoc(userRef, {
          ...userData,
          createdAt: new Date().toISOString(),
          loginCount: 1
        });
        console.log("✅ New admin user created in Firestore");
      } else {
        // Existing user - update
        const existingData = userDoc.data();
        await setDoc(userRef, {
          ...userData,
          createdAt: existingData.createdAt,
          loginCount: (existingData.loginCount || 0) + 1
        }, { merge: true });
        console.log("✅ Admin user updated in Firestore");
      }
    } catch (error) {
      console.error("Error creating/updating user in Firestore:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First check if email is authorized
      if (!AUTHORIZED_ADMINS.includes(email)) {
        setError("Access denied. You are not an authorized administrator.");
        setLoading(false);
        return;
      }

      // Login with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("✅ Login successful for admin:", user.email);
      
      // Create/update user in Firestore
      await createUserInFirestore(user);
      
      // Get ID Token
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("adminEmail", user.email);
      localStorage.setItem("isAdmin", "true");
      
      // Navigate to Dashboard
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Show error message based on error type
      switch (error.code) {
        case 'auth/user-not-found':
          setError("No account found with this email");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password");
          break;
        case 'auth/invalid-email':
          setError("Invalid email format");
          break;
        case 'auth/too-many-requests':
          setError("Too many failed attempts. Please try again later");
          break;
        default:
          setError("Login failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl" data-aos="zoom-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-amber-700 rounded-full opacity-20 animate-ping"></div>
              <div className="relative bg-amber-700 rounded-full w-24 h-24 flex items-center justify-center">
                <Shield size={48} className="text-white" />
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-lg">Checking authorization...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-gray-100 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 hover:scale-105"
        data-aos="zoom-in"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Shield size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">Admin</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mt-4">Admin Login</h1>
          <p className="text-gray-500 mt-2">Access restricted to authorized personnel only</p>
        </div>

        {/* Authorized Admins List */}
        <div 
          className="bg-amber-50 p-4 rounded-xl mb-6 border border-amber-200"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-amber-700" />
            <p className="text-sm text-amber-800 font-semibold">Authorized Administrators:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {AUTHORIZED_ADMINS.map((adminEmail, index) => (
              <span 
                key={index}
                className="text-xs bg-white px-3 py-1 rounded-full text-amber-700 border border-amber-200 shadow-sm"
              >
                {adminEmail}
              </span>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 flex items-start gap-3 animate-shake"
            data-aos="fade-in"
          >
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div data-aos="fade-up" data-aos-delay="200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-700 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200 transition-all"
                placeholder="admin@coffee.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div data-aos="fade-up" data-aos-delay="300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-700 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200 transition-all"
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white py-3 rounded-xl font-semibold hover:from-amber-800 hover:to-amber-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login as Admin</span>
              </>
            )}
          </button>
        </form>

        {/* Test Credentials */}
        <div 
          className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <p className="text-sm text-amber-800 font-semibold mb-2">Test Credentials:</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-600">
              <span className="font-medium">Email:</span> jing@gmail.com
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Password:</span> 12345aA
            </p>
          </div>
          <p className="text-xs text-amber-600 mt-2 italic">
            * Only authorized admins can access the dashboard
          </p>
        </div>

        {/* Help Link */}
        <p className="text-center text-xs text-gray-400 mt-4">
          For assistance, contact system administrator
        </p>
      </div>
    </div>
  );
};

export default Admin;