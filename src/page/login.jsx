import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../data/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { 
 
  XCircle,
  Coffee,
  ArrowLeft,

} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. Login with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uid = user.uid;

      // 2. Get role from Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        // 3. Update last login
        await updateDoc(docRef, {
          lastLogin: serverTimestamp()
        });

        // 4. Save role in localStorage
        localStorage.setItem("role", role);
        localStorage.setItem("uid", uid);

        // 5. Redirect by role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/UserDashboard");
        }

      } else {
        alert("No user data found!");
      }

    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="mt-2 min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-gray-100 flex items-center justify-center p-4">
        {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-amber-700​ mt-20"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
    <div className="flex gap-10 items-center justify-center mt-20 m-20">
      <div className="left  ">
         

         <form onSubmit={handleLogin} className=" bg-white rounded-3xl shadow-2xl max-w-md p-8 w-[600px] h-[600px]">
           <div className="text-center mb-8 ">
            <Coffee size={50} className="mx-auto text-amber-700 " />
            <h1 className="text-3xl font-bold text-amber-800 mt-4">Sign In to Continue.</h1>
             <p className="text-center mt-5">
            Already have account?{" "}
           
            <span
              className="text-amber-700 cursor-pointer"
              onClick={() => navigate("/signup")}//----edit 
            >
              sign up
            </span>
          </p>
          </div>
        <label htmlFor="" className="text-lg p-3">
          Email
          </label>  
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-[380px] h-[50px] p-2 border-2 border-black rounded-2xl mb-5"
      />
       <label htmlFor="" className="text-lg p-3">
          Password
          </label>  
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
         className="w-[380px] h-[50px] p-2 border-2 border-black rounded-2xl mb-5"
      />

      <button type="submit" className="w-full mt-5 py-3 rounded-xl text-white font-bold bg-amber-700 hover:bg-amber-800">Login</button>
      
    </form>
      </div>
      <div className="right">
       <img src="https://i.pinimg.com/736x/d8/e5/3d/d8e53de1fbe738031a2e4fbb54998a05.jpg" alt="" className="w-[500px] h-[600px] object-cover rounded-2xl" />
      </div>
    </div>
   
    </div>
  );
};

export default Login;