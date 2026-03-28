
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

// កែ imports ឲ្យត្រឹមត្រូវ (ករណីអក្សរ)
import Home from "../page/Home";
import About from "../page/About";
import Services from "../page/Services";
import Contact from "../page/Contact";
import Info from "../page/info";        // ប្តូរពី info ទៅ Info
import Detail from "../page/Detail";
import NotFound from "../page/notFount"; // ប្តូរពី notFount ទៅ NotFound

import Admin from "../page/Admin";
import Dashboard from "../page/dashboard"; // ប្តូរពី dashboard ទៅ Dashboard
import AdminProfile from "../page/AdminProfile";
import Signup from "../page/Signup";
import UserDashboard from "../page/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Pay from "../page/pay";
import Menu from "../page/menu";
import Drinks from "../menu/drinks";
import Snacks from "../menu/snacks";
import Coffee from "../menu/coffee";
import Order_success from "../page/order_success";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import Login from "../page/login";





// import detail from "../page/Detail";


function AppRoute() {
  return (
    <Routes>
      {/* ✅ Public Website */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="info" element={<Info />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="signup" element={<Signup />} />
        <Route path="menu" element={<Menu />} />
        <Route path="coffee" element={<Coffee />} />
        <Route path="snack" element={<Snacks />} />
        <Route path="drink" element={<Drinks />} />
        <Route path="order-success" element={<Order_success />} />
        <Route path="login" element={<Login />} />


        {/* Protected page inside layout */}
        {/* <Route
          path="adminprofile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        /> */}
      </Route>

      {/* ✅ Login */}
      {/* <Route path="/admin" element={<Admin />} /> */}

      {/* ✅ ADMIN Dashboard */}
      {/* <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roleRequired="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}

      {/* ✅ USER Dashboard */}
      {/* <Route
  path="/UserDashboard"
  element={
    <ProtectedRoute roleRequired="user">
      <UserDashboard />
    </ProtectedRoute>
  }
/> */}
{/* ----------new protect----- */}
<Route path="/admin/dashboard" element={
  <AdminRoute>
    <Dashboard />
  </AdminRoute>
} />

<Route path="/UserDashboard" element={
  <UserRoute>
    <UserDashboard />
  </UserRoute>
} />
<Route path="/pay" element={<Pay />} />


      {/* ✅ Smart Redirect */}
      {/* <Route
        path="/dashboard"
        element={<Navigate to="/admin/dashboard" replace />}
      /> */}

      {/* ✅ 404 - ត្រូវដាក់នៅចុងបំផុត */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;