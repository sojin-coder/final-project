// src/page/Admin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, Shield, Eye, EyeOff } from "lucide-react";
import { auth, db } from "../data/firebase";
import { 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserSessionPersistence, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
  
  const navigate = useNavigate();

  // បង្ខំឱ្យ Logout រាល់ពេលដែលចូលមកដល់ទំព័រ Login នេះ
  useEffect(() => {
    const clearSession = async () => {
      await signOut(auth);
      localStorage.clear(); // សម្អាត storage ក្នុង browser ទាំងអស់
      console.log("Session cleared. Ready for new login.");
    };
    clearSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ១. ឆែក Email ក្នុងបញ្ជីសិន
      if (!AUTHORIZED_ADMINS.includes(email)) {
        setError("Email របស់អ្នកមិនត្រូវបានអនុញ្ញាតឱ្យចូលប្រើឡើយ!");
        setLoading(false);
        return;
      }

      // ២. កំណត់ឱ្យវា Logout ពេលបិទ Browser (Session Persistence)
      await setPersistence(auth, browserSessionPersistence);

      // ៣. ធ្វើការ Login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ៤. រក្សាទុកទិន្នន័យក្នុង Firestore (Optional)
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        lastLogin: new Date().toISOString(),
        role: "admin"
      }, { merge: true });

      // ៥. ជោគជ័យ -> ទៅ Dashboard
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError("ការចូលប្រព័ន្ធបរាជ័យ! សូមពិនិត្យអ៊ីមែល និងលេខសម្ងាត់ឡើងវិញ។");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Authentication</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2 border border-red-200">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-lg font-medium transition-all"
          >
            {loading ? "Verifying..." : "Login to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;