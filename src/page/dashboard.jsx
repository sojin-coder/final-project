import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Home, LogOut, Menu, Coffee, ChevronLeft, ChevronRight } from "lucide-react"; // បន្ថែម Icons

const ADMIN_EMAIL = [
  "jing@gmail.com",
  "raksa@gmail.com",
  "Sophoeurs668@gmail.com",
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.email) {
      if (!ADMIN_EMAIL.includes(user.email)) {
        navigate("/user/dashboard");
        return;
      }

      setUserEmail(user.email);
      fetchUsers();
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));

    const usersOnly = snapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.role === "user";
    });

    setTotalUsers(usersOnly.length);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`bg-gradient-to-b from-orange-800 to-orange-600 text-white 
        ${sidebarOpen ? "w-64" : "w-20"} 
        transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 font-bold text-xl border-b border-orange-400">
          <div className="flex items-center gap-2">
            <Coffee size={24} />
            {sidebarOpen && "Admin"}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-lg hover:bg-orange-700 p-1 rounded"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2">
          <MenuItem open={sidebarOpen} title="Dashboard" active icon="📊" />
          <MenuItem open={sidebarOpen} title="Manage Menu" icon="📝" />
          <MenuItem open={sidebarOpen} title="Orders" icon="📦" />
          <MenuItem open={sidebarOpen} title="Customers" icon="👥" />
          <MenuItem open={sidebarOpen} title="Analytics" icon="📈" />
          <MenuItem open={sidebarOpen} title="Settings" icon="⚙️" />
        </nav>

        {/* Sidebar Footer with Back to Home Button */}
        <div className="p-3 space-y-2">
          {/* BACK TO HOME BUTTON - ប៊ូតុងថ្មី */}
          <button
            onClick={handleBackToHome}
            className="w-full bg-orange-700 hover:bg-orange-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            {sidebarOpen && "Back to Home"}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1">
        {/* NAVBAR - បន្ថែម Back to Home Button នៅខាងស្តាំដៃ */}
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* BACK TO HOME BUTTON (Mobile/Compact) - ប៊ូតុងទីពីរ */}
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              title="Back to Home"
            >
              <Home size={18} className="text-orange-600" />
              <span className="hidden md:inline text-gray-700">Home</span>
            </button>

            <div className="font-semibold bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm">
                {userEmail?.charAt(0).toUpperCase()}
              </span>
              <span className="hidden md:inline">{userEmail}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Coffee className="text-orange-600" />
            Welcome Back, Admin! 👋
          </h1>

          {/* ===== STAT CARDS ===== */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <Card
              title="Revenue"
              value="$1,250"
              color="from-blue-500 to-blue-600"
              icon="💰"
            />
            <Card
              title="Orders"
              value="45"
              color="from-green-500 to-green-600"
              icon="📦"
            />
            <Card
              title="Comments"
              value="50"
              color="from-purple-500 to-purple-600"
              icon="💬"
            />
            <Card
              title="Users"
              value={totalUsers}
              color="from-orange-500 to-orange-600"
              icon="👥"
            />
          </div>

          {/* ===== TABLE ===== */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-orange-600 rounded-full"></span>
              Recent Orders
            </h2>

            <table className="w-full">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 text-left">ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Menu</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                  <th className="text-left"></th>
                </tr>
              </thead>

              <tbody>
                <Row
                  id="#001"
                  name="Jing"
                  menu="Matcha"
                  amount="$500"
                  status="Completed"
                  color="green"
                />
                <Row
                  id="#002"
                  name="Sophoeus"
                  menu="Ice Latte"
                  amount="$600"
                  status="Pending"
                  color="yellow"
                />
                <Row
                  id="#003"
                  name="Raksa"
                  menu="Ice Coffee"
                  amount="$600"
                  status="Pending"
                  color="yellow"
                />
              </tbody>
            </table>

            {/* View All Button */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const MenuItem = ({ title, open, active, icon }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
    ${active 
      ? "bg-white text-orange-600 font-semibold shadow-md" 
      : "hover:bg-orange-700 hover:translate-x-1"
    }`}
  >
    <span className="text-lg">{icon}</span>
    {open && <span>{title}</span>}
  </div>
);

const Card = ({ title, value, color, icon }) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group`}
  >
    <div className="flex justify-between items-start">
      <p className="opacity-80 text-sm">{title}</p>
      <span className="text-2xl opacity-50 group-hover:scale-110 transition-transform">
        {icon}
      </span>
    </div>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
    <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
      <span>↑</span> +12% from last month
    </div>
  </div>
);

const Row = ({ id, name, menu, amount, status, color }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="py-4 font-medium">{id}</td>
    <td>{name}</td>
    <td>{menu}</td>
    <td className="font-semibold">{amount}</td>
    <td>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold
        ${color === "green" && "bg-green-100 text-green-600"}
        ${color === "yellow" && "bg-yellow-100 text-yellow-700"}
        `}
      >
        {status}
      </span>
    </td>
    <td>
      <button className="text-orange-600 hover:text-orange-800 font-semibold hover:underline transition-all">
        Edit
      </button>
    </td>
  </tr>
);

export default Dashboard;