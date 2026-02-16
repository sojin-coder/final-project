import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { 
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Coffee,
  ArrowLeft,
  UserPlus
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Signup = () => {
  const navigate = useNavigate();

  // ✅ Form States
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [agreed, setAgreed] = useState(false); // ⭐ FIX CHECKBOX
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // ✅ Password Strength
  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength += 25;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return Math.min(strength, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (error) setError("");
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{9,10}$/.test(phone);

  const isFormValid = () => {
    return (
      formData.name.length >= 2 &&
      validatePhone(formData.phone) &&
      validateEmail(formData.email) &&
      formData.password.length >= 6 &&
      formData.confirmPassword === formData.password &&
      agreed // ⭐ FIX
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ Create Auth User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ⭐ ADD DISPLAY NAME
      await updateProfile(user, {
        displayName: formData.name,
      });

      // ✅ Firestore user
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        phone: formData.phone,
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true,
      });

      // ✅ Redirect
      navigate("/UserDashboard");

    } catch (err) {
      console.error("Signup error:", err);

      switch(err.code) {
        case "auth/email-already-in-use":
          setError("This email is already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        default:
          setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-gray-100 flex items-center justify-center p-4">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-amber-700​ mt-20"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">

        <div className="text-center mb-8">
          <Coffee size={50} className="mx-auto text-amber-700" />
          <h1 className="text-3xl font-bold text-amber-800 mt-4">
            Create Account
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 flex gap-2">
            <XCircle size={18}/>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          {/* ✅ CHECKBOX FIX */}
          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to Terms & Privacy
          </label>

          <button
            disabled={loading || !isFormValid()}
            className={`w-full py-3 rounded-xl text-white font-bold ${
              loading || !isFormValid()
                ? "bg-gray-400"
                : "bg-amber-700 hover:bg-amber-800"
            }`}
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>

          {/* ✅ LOGIN ROUTE FIX */}
          <p className="text-center">
            Already have account?{" "}
            <span
              className="text-amber-700 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
