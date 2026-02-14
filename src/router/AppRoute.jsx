// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Home from "../page/Home";
// import About from "../page/About";
// import Services from "../page/Services";
// import Contact from "../page/Contact";
// import Info from "../page/Info";
// import Detail from "../page/Detail";
// import NotFount from "../page/notFount";
// import Admin from "../page/Admin";
// import Dashboard from "../page/dashboard";
// import Adp from "../page/AdminProfile";
// import ProtectedRoute from "./ProtectedRoute";

// function AppRoute() {
//   return (
//     <Routes>
//       {/* 👇 Public Routes with MainLayout */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="services" element={<Services />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="info" element={<Info />} />
//         <Route path="detail/:id" element={<Detail />} />

//         {/* Admin Profile - Protected */}
//         <Route
//           path="admin/profile"
//           element={
//             <ProtectedRoute>
//               <Adp />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* 👇 Admin Routes WITHOUT MainLayout (Separate Layout) */}
//       {/* Admin Login (Public) */}
//       <Route path="/admin" element={<Admin />} />

//       {/* Admin Dashboard (Protected) */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Redirect /admin to /admin/login */}
//       <Route path="/admin" element={<Admin />} />

//       {/* Redirect old /dashboard to new /admin/dashboard */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       } />

//       {/* 👇 404 Page */}
//       <Route path="*" element={<NotFount />} />
//     </Routes>
//   );
// }

// export default AppRoute;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Home from "../page/Home";
// import About from "../page/About";
// import Services from "../page/Services";
// import Contact from "../page/Contact";
// import Info from "../page/Info";
// import Detail from "../page/Detail";
// import NotFound from "../page/notFount";
// import Admin from "../page/Admin";
// import Dashboard from "../page/dashboard";
// import AdminProfile from "../page/AdminProfile";
// import ProtectedRoute from "./ProtectedRoute";

// function AppRoute() {
//   return (
//     <Routes>
//       {/* Public Routes inside MainLayout */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="services" element={<Services />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="info" element={<Info />} />
//         <Route path="detail/:id" element={<Detail />} />

//         {/* Admin Profile (Protected) */}
//         <Route
//           path="admin/profile"
//           element={
//             <ProtectedRoute>
//               <AdminProfile />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Admin Login (Public) */}
//       <Route path="/admin" element={<Admin />} />

//       {/* Admin Dashboard (Protected) */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Redirect old /dashboard → /admin/dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default AppRoute;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Home from "../page/Home";
// import About from "../page/About";
// import Services from "../page/Services";
// import Contact from "../page/Contact";
// import Info from "../page/Info";
// import Detail from "../page/Detail";
// import NotFound from "../page/notFount"; // ប្រយ័ត្នអក្ខរាវិរុទ្ធ (fount -> found)
// import Admin from "../page/Admin";
// import Dashboard from "../page/dashboard";
// import AdminProfile from "../page/AdminProfile";
// import ProtectedRoute from "./ProtectedRoute";

// function AppRoute() {
//   return (
//     <Routes>
//       {/* Public Routes inside MainLayout */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="services" element={<Services />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="info" element={<Info />} />
//         <Route path="detail/:id" element={<Detail />} />

//         {/* កែប្រែត្រង់នេះ៖ ប្រើ "AdminProfile" ដើម្បីឱ្យត្រូវនឹង URL ដែលអ្នកចង់បាន */}
//         <Route
//           path="AdminProfile"
//           element={
//             <ProtectedRoute>
//               <AdminProfile />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Admin Login (Public) */}
//       <Route path="/admin" element={<Admin />} />

//       {/* Admin Dashboard (Protected) */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Redirect old /dashboard → /admin/dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 404 - ករណីរកផ្លូវមិនឃើញ */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default AppRoute;
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/Home";
import About from "../page/About";
import Services from "../page/Services";
import Contact from "../page/Contact";
import Info from "../page/Info";
import Detail from "../page/Detail";
import NotFound from "../page/notFount"; // បើឈ្មោះ File ពិតប្រាកដគឺ NotFound គួរកែឱ្យត្រូវគ្នា
import Admin from "../page/Admin";
import Dashboard from "../page/dashboard";
import AdminProfile from "../page/AdminProfile";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../page/Signup";

function AppRoute() {
  return (
    <Routes>
      {/* Public Routes inside MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="info" element={<Info />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Profile */}
        <Route
          path="AdminProfile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Login Page */}
      <Route path="/admin" element={<Admin />} />

      {/* ✅ បន្ថែម Route សម្រាប់ /user/dashboard ដែលអ្នកកំពុងខ្វះ */}
      {/* សម្រាប់ Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roleRequired="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* សម្រាប់ User Dashboard */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute roleRequired="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect old /dashboard path */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;
