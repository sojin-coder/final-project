// // // src/pages/Dashboard.jsx
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { auth } from "../data/firebase";
// // import { signOut } from "firebase/auth";

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const user = auth.currentUser;

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth);
// //       navigate("/admin/login");
// //     } catch (error) {
// //       console.error("Error logging out:", error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Navbar */}
// //       <nav className="bg-white shadow-md">
// //         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
// //           <h1 className="text-xl font-bold">Admin Dashboard</h1>
// //           <div className="flex items-center gap-4">
// //             <span className="text-gray-700">
// //               Welcome, {user?.email || "Admin"}
// //             </span>
// //             <button
// //               onClick={handleLogout}
// //               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {/* Card 1 */}
// //             <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// //               <h3 className="text-lg font-semibold text-blue-800 mb-2">Users</h3>
// //               <p className="text-3xl font-bold text-blue-600">0</p>
// //               <p className="text-gray-600 mt-2">Total registered users</p>
// //             </div>

// //             {/* Card 2 */}
// //             <div className="bg-green-50 p-6 rounded-lg border border-green-200">
// //               <h3 className="text-lg font-semibold text-green-800 mb-2">Courses</h3>
// //               <p className="text-3xl font-bold text-green-600">0</p>
// //               <p className="text-gray-600 mt-2">Available courses</p>
// //             </div>

// //             {/* Card 3 */}
// //             <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
// //               <h3 className="text-lg font-semibold text-purple-800 mb-2">Visits</h3>
// //               <p className="text-3xl font-bold text-purple-600">0</p>
// //               <p className="text-gray-600 mt-2">Today's visits</p>
// //             </div>
// //           </div>

// //           {/* Recent Activity */}
// //           <div className="mt-8">
// //             <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
// //             <div className="bg-gray-50 p-4 rounded">
// //               <p className="text-gray-600">No recent activity</p>
// //             </div>
// //           </div>

// //           {/* Quick Actions */}
// //           <div className="mt-8">
// //             <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
// //             <div className="flex gap-4">
// //               <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
// //                 Add New Course
// //               </button>
// //               <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
// //                 Manage Users
// //               </button>
// //               <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
// //                 View Reports
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// // src/pages/Dashboard.jsx

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../data/firebase";
// import { signOut } from "firebase/auth";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     // Get current user
//     const user = auth.currentUser;
//     if (user && user.email) {
//       setUserEmail(user.email);
//     } else {
//       // If no user, redirect to login
//       navigate("/admin");
//     }
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/admin");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50​ mt-10">
//       {/* Navigation */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//             <p className="text-gray-600">Welcome back, {userEmail}</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Stats Cards */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
//             <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">Courses</h3>
//             <p className="text-3xl font-bold text-green-600 mt-2">0</p>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">Visitors</h3>
//             <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
//               Add Course
//             </button>
//             <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
//               Manage Users
//             </button>
//             <button className="p-4 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
//               View Analytics
//             </button>
//             <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
//               Settings
//             </button>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="mt-8 bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
//           <div className="text-gray-500 text-center py-8">
//             <p>No recent activity</p>
//             <p className="text-sm mt-2">Activities will appear here</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../data/firebase";
// import { signOut } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";

// // ⚡ ដាក់ Admin Emails
// const ADMIN_EMAIL = ["jing@gmail.com","raksa@gmail.com","Sophoeurs668@gmail.com"];

// const Dashboard = () => {

//   const navigate = useNavigate();

//   const [userEmail, setUserEmail] = useState("");
//   const [totalUsers, setTotalUsers] = useState(0);

//   // ✅ Check Login
//   useEffect(() => {

//     const user = auth.currentUser;

//     if (user && user.email) {

//       // ❗ Protect route (បើមិនមែន admin → kick)
//       if (!ADMIN_EMAIL.includes(user.email)) {
//         navigate("/user/dashboard");
//         return;
//       }

//       setUserEmail(user.email);
//       fetchUsers(); // 🔥 load users

//     } else {
//       navigate("/admin");
//     }

//   }, [navigate]);


//   // ✅ Fetch Users (មិនរាប់ admin)
//   const fetchUsers = async () => {
//     try {

//       const snapshot = await getDocs(collection(db, "users"));

//       const usersOnly = snapshot.docs.filter(doc => {
//         const data = doc.data();
//         return data.role === "user"; // 🔥 IMPORTANT
//       });

//       setTotalUsers(usersOnly.length);

//     } catch (error) {
//       console.log("Fetch users error:", error);
//     }
//   };


//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/admin");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 mt-10">

//       {/* Navbar */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600">
//               Welcome back, {userEmail}
//             </p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>


//       {/* Main */}
//       <main className="container mx-auto px-6 py-8">

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//           {/* Users */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">
//               Total Users
//             </h3>

//             <p className="text-3xl font-bold text-blue-600 mt-2">
//               {totalUsers}
//             </p>
//           </div>

//           {/* Dummy Cards */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">
//               Courses
//             </h3>
//             <p className="text-3xl font-bold text-green-600 mt-2">
//               0
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700">
//               Visitors
//             </h3>
//             <p className="text-3xl font-bold text-purple-600 mt-2">
//               0
//             </p>
//           </div>

//         </div>


//         {/* Quick Actions */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold mb-4">
//             Quick Actions
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//             <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
//               Add Course
//             </button>

//             <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
//               Manage Users
//             </button>

//             <button className="p-4 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
//               View Analytics
//             </button>

//             <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
//               Settings
//             </button>

//           </div>
//         </div>


//         {/* Activity */}
//         <div className="mt-8 bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold mb-4">
//             Recent Activity
//           </h2>

//           <div className="text-gray-500 text-center py-8">
//             <p>No recent activity</p>
//             <p className="text-sm mt-2">
//               Activities will appear here
//             </p>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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
          {sidebarOpen ? "☕ Admin" : "☕"}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-lg"
          >
            ☰
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2">

          <MenuItem open={sidebarOpen} title="Dashboard" active />
          <MenuItem open={sidebarOpen} title="Manage Menu" />
          <MenuItem open={sidebarOpen} title="Orders" />
          <MenuItem open={sidebarOpen} title="Customers" />
          <MenuItem open={sidebarOpen} title="Analytics" />
          <MenuItem open={sidebarOpen} title="Settings" />

        </nav>

        <div className="p-3">
          <button
            onClick={handleLogout}
            className="w-full bg-orange-700 hover:bg-orange-800 py-3 rounded-lg font-semibold"
          >
            {sidebarOpen ? "Logout" : "🚪"}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1">

        {/* NAVBAR */}
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="font-semibold bg-gray-100 px-4 py-2 rounded-lg">
            👤 {userEmail}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Welcome Back 👋
          </h1>

          {/* ===== STAT CARDS ===== */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <Card
              title="Revenue"
              value="$1,250"
              color="from-blue-500 to-blue-600"
            />

            <Card
              title="Orders"
              value="45"
              color="from-green-500 to-green-600"
            />

            <Card
              title="Comments"
              value="50"
              color="from-purple-500 to-purple-600"
            />

            <Card
              title="Users"
              value={totalUsers}
              color="from-orange-500 to-orange-600"
            />

          </div>

          {/* ===== TABLE ===== */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Recent Orders
            </h2>

            <table className="w-full">

              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3">ID</th>
                  <th>Customer</th>
                  <th>Menu</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
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

          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const MenuItem = ({ title, open, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
    ${active ? "bg-white text-orange-600 font-semibold" : "hover:bg-orange-400"}`}
  >
    📌
    {open && title}
  </div>
);

const Card = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition`}
  >
    <p className="opacity-80">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const Row = ({ id, name, menu, amount, status, color }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="py-4">{id}</td>
    <td>{name}</td>
    <td>{menu}</td>
    <td>{amount}</td>

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

    <td className="text-blue-500 cursor-pointer font-semibold">
      Edit
    </td>
  </tr>
);

export default Dashboard;

