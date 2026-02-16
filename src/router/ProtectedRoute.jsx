// src/router/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// បញ្ជី Admin ដែលអនុញ្ញាត (តែ 3 នាក់ប៉ុណ្ណោះ)
const ALLOWED_ADMIN_EMAILS = [
  "raksa@gmail.com",
  "jing@gmail.com", 
  "sophoeurs668@gmail.com"
];

const ProtectedRoute = ({ children, roleRequired }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    userRole: null
  });
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;

      if (user) {
        console.log("✅ User logged in:", user.email);
        
        try {
          // ពិនិត្យថាតើអ៊ីមែលនេះស្ថិតក្នុងបញ្ជី Admin ដែរឬទេ?
          const isAdmin = ALLOWED_ADMIN_EMAILS.includes(user.email);
          
          let userRole = "user"; // Default role
          
          if (isAdmin) {
            userRole = "admin";
            console.log("👑 Admin access granted for:", user.email);
          } else {
            console.log("❌ Not an admin:", user.email);
          }
          
          // ទាញយកព័ត៌មានពី Firestore (បើមាន)
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              // ប្រើ Role ពី Firestore ប្រសិនបើមាន
              userRole = userDoc.data().role || userRole;
            }
          } catch (firestoreError) {
            console.log("Firestore not available, using email-based role");
          }

          // រក្សាទុកព័ត៌មានក្នុង localStorage
          localStorage.setItem("user", JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: userRole,
            isAdmin: isAdmin
          }));

          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            user: user,
            userRole: userRole
          });
        } catch (error) {
          console.error("Error in auth process:", error);
          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            user: user,
            userRole: "user"
          });
        }
      } else {
        console.log("❌ No user logged in");
        localStorage.removeItem("user");
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          userRole: null
        });
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Loading State
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-gray-100">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-amber-700 rounded-full opacity-20 animate-ping"></div>
              <div className="relative bg-amber-700 rounded-full w-24 h-24 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-amber-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-6 text-lg">Verifying access...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  // បើមិនទាន់ចូលប្រព័ន្ធ
  if (!authState.isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // ពិនិត្យ Role (បើមាន)
  if (roleRequired === "admin" && authState.userRole !== "admin") {
    console.log(`⛔ Access denied. User role: ${authState.userRole}, Required: ${roleRequired}`);
    return <Navigate to="/unauthorized" replace />;
  }

  // ចូលប្រព័ន្ធរួចរាល់
  return children;
};

export default ProtectedRoute;