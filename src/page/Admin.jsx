// src/page/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Coffee } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Shield size={48} className="text-red-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. <br />
          This area is restricted to authorized administrators only.
        </p>

        <div className="bg-amber-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-amber-800 font-semibold mb-2">
            Authorized Admins:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• raksa@gmail.com</li>
            <li>• jing@gmail.com</li>
            <li>• sophoeurs668@gmail.com</li>
          </ul>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            <ArrowLeft size={20} />
            Go Home
          </button>
          
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition"
          >
            <Coffee size={20} />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;