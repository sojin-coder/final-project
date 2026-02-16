// src/page/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Coffee,
  History,
  Heart,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  ShoppingBag,
  Star,
  Clock,
  Calendar,
  Award,
  CreditCard,
  Home,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Tabs configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "orders", label: "Order History", icon: <History size={20} /> },
    { id: "favorites", label: "Favorites", icon: <Heart size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin");
        return;
      }

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          uid: user.uid,
          email: user.email,
          ...data
        });
        setEditedData(data);
      }

      // Fetch order history
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const orders = [];
      ordersSnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrderHistory(orders);

      // Fetch favorites
      const favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favs = [];
      favoritesSnapshot.forEach((doc) => {
        favs.push({ id: doc.id, ...doc.data() });
      });
      setFavorites(favs);

      // Fetch notifications
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notifs = [];
      notificationsSnapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notifs);

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const user = auth.currentUser;
      await updateDoc(doc(db, "users", user.uid), editedData);
      setUserData(prev => ({ ...prev, ...editedData }));
      setEditMode(false);
      
      // Show success notification
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-100 flex items-center justify-center">
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
            <p className="text-gray-600 mt-6 text-lg">Loading your dashboard...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
                <Coffee size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-800">User Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {userData?.name || userData?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-700 transition"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80" data-aos="fade-right">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* User Info Card */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-3xl font-bold">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : userData?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">{userData?.name || "User"}</h2>
                <p className="text-sm text-gray-500">{userData?.email}</p>
                <p className="text-xs text-amber-600 mt-2 capitalize">{userData?.role || "Member"}</p>
              </div>

              {/* Member Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-amber-50 p-3 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-700">{orderHistory.length}</div>
                  <div className="text-xs text-gray-600">Orders</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-700">{favorites.length}</div>
                  <div className="text-xs text-gray-600">Favorites</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition ${
                      activeTab === tab.id
                        ? "bg-amber-700 text-white"
                        : "hover:bg-amber-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    {tab.id === "notifications" && notifications.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1" data-aos="fade-left">
            <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[600px]">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                    {!editMode ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition"
                      >
                        <Edit size={18} />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        >
                          <Save size={18} />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            setEditedData(userData);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                        >
                          <X size={18} />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <User size={18} className="text-amber-700" />
                        Personal Information
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <User size={18} className="text-amber-700" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">Full Name</p>
                            {editMode ? (
                              <input
                                type="text"
                                value={editedData.name || ""}
                                onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                                className="w-full p-1 border rounded"
                              />
                            ) : (
                              <p className="font-medium">{userData?.name || "Not set"}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Mail size={18} className="text-amber-700" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{userData?.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Phone size={18} className="text-amber-700" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">Phone</p>
                            {editMode ? (
                              <input
                                type="text"
                                value={editedData.phone || ""}
                                onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                                className="w-full p-1 border rounded"
                              />
                            ) : (
                              <p className="font-medium">{userData?.phone || "Not set"}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <MapPin size={18} className="text-amber-700" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">Address</p>
                            {editMode ? (
                              <input
                                type="text"
                                value={editedData.address || ""}
                                onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                                className="w-full p-1 border rounded"
                              />
                            ) : (
                              <p className="font-medium">{userData?.address || "Not set"}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Statistics */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <Award size={18} className="text-amber-700" />
                        Account Statistics
                      </h3>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-amber-700">
                              {orderHistory.length}
                            </div>
                            <div className="text-sm text-gray-600">Total Orders</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-amber-700">
                              {favorites.length}
                            </div>
                            <div className="text-sm text-gray-600">Favorites</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-amber-700">
                              {userData?.loyaltyPoints || 0}
                            </div>
                            <div className="text-sm text-gray-600">Loyalty Points</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-amber-700">
                              {userData?.memberSince ? new Date(userData.memberSince).getFullYear() : "2024"}
                            </div>
                            <div className="text-sm text-gray-600">Member Since</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-700 mb-3">Membership Benefits</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                            <span>10% off on all orders</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                            <span>Free delivery on orders over $20</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                            <span>Exclusive member-only offers</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                            <span>Birthday special gift</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                  {orderHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No orders yet</p>
                      <button
                        onClick={() => navigate("/services")}
                        className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderHistory.map((order, index) => (
                        <div key={index} className="border rounded-xl p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              order.status === "delivered" ? "bg-green-100 text-green-700" :
                              order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">Items: {order.items?.length || 0}</p>
                            <p className="text-lg font-bold text-amber-700">Total: ${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No favorites yet</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {favorites.map((fav, index) => (
                        <div key={index} className="border rounded-xl p-4 flex gap-4">
                          <img src={fav.image} alt={fav.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div>
                            <h3 className="font-semibold">{fav.name}</h3>
                            <p className="text-amber-700 font-bold">${fav.price}</p>
                            <button className="text-sm text-amber-600 hover:underline">Add to cart</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Bell size={18} className="text-amber-700" />
                        Notifications
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-amber-700" defaultChecked />
                          <span>Email notifications</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-amber-700" defaultChecked />
                          <span>SMS notifications</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-amber-700" />
                          <span>Promotional emails</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield size={18} className="text-amber-700" />
                        Privacy
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-amber-700" defaultChecked />
                          <span>Make profile public</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-amber-700" defaultChecked />
                          <span>Show order history</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard size={18} className="text-amber-700" />
                        Payment Methods
                      </h3>
                      <button className="px-4 py-2 border border-amber-700 text-amber-700 rounded-xl hover:bg-amber-50 transition">
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notif, index) => (
                        <div key={index} className="border-l-4 border-amber-700 bg-gray-50 p-4 rounded-r-xl">
                          <p className="font-medium">{notif.title}</p>
                          <p className="text-sm text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4" data-aos="zoom-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;