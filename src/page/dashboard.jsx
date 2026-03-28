import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  toggleProductAvailability,
  getDashboardStats,
  getAllOrders,
  getAllUsers
} from "../data/firebase"; // Import functions from firebase.js
import { signOut } from "firebase/auth";
import { 
  Home, 
  LogOut, 
  Coffee, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  X,
  Save,
  AlertCircle
} from "lucide-react";

const ADMIN_EMAIL = [
  "jing@gmail.com",
  "raksa@gmail.com",
  "Sophoeurs668@gmail.com",
];

// ================= MAIN COMPONENT =================
const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.email) {
      if (!ADMIN_EMAIL.includes(user.email)) {
        navigate("/user/dashboard");
        return;
      }

      setUserEmail(user.email);
      fetchDashboardStats();
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchDashboardStats = async () => {
    const result = await getDashboardStats();
    if (result.success) {
      setStats(result.data);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent stats={stats} userEmail={userEmail} />;
      case "manage-menu":
        return <ManageMenuContent />;
      case "orders":
        return <OrdersContent />;
      case "customers":
        return <CustomersContent />;
      case "analytics":
        return <AnalyticsContent stats={stats} />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent stats={stats} userEmail={userEmail} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - same as before */}
      <aside
        className={`bg-gradient-to-b from-orange-900 to-orange-800 text-white 
        ${sidebarOpen ? "w-64" : "w-20"} 
        transition-all duration-300 flex flex-col`}
      >
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

        <nav className="flex-1 p-3 space-y-2">
          <MenuItem open={sidebarOpen} title="Dashboard" active={activeTab === "dashboard"} icon="📊" onClick={() => setActiveTab("dashboard")} />
          <MenuItem open={sidebarOpen} title="Manage Menu" active={activeTab === "manage-menu"} icon="📝" onClick={() => setActiveTab("manage-menu")} />
          <MenuItem open={sidebarOpen} title="Orders" active={activeTab === "orders"} icon="📦" onClick={() => setActiveTab("orders")} />
          <MenuItem open={sidebarOpen} title="Customers" active={activeTab === "customers"} icon="👥" onClick={() => setActiveTab("customers")} />
          <MenuItem open={sidebarOpen} title="Analytics" active={activeTab === "analytics"} icon="📈" onClick={() => setActiveTab("analytics")} />
          <MenuItem open={sidebarOpen} title="Settings" active={activeTab === "settings"} icon="⚙️" onClick={() => setActiveTab("settings")} />
        </nav>

        <div className="p-3 space-y-2">
          <button onClick={handleBackToHome} className="w-full bg-orange-700 hover:bg-orange-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
            <Home size={20} />
            {sidebarOpen && "Back to Home"}
          </button>
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleBackToHome} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
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

        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// ================= MANAGE MENU CONTENT (Using functions from firebase.js) =================
const ManageMenuContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    available: true,
    featured: false
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Fetch products using function from firebase.js
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getAllProducts();
      if (result.success) {
        setMenuItems(result.data);
      } else {
        showNotification("Failed to fetch products", "error");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      available: true,
      featured: false
    });
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      name: item.name || "",
      price: item.price || "",
      category: item.category || "",
      description: item.description || "",
      image: item.image || "",
      available: item.available !== undefined ? item.available : true,
      featured: item.featured || false
    });
    setShowModal(true);
  };

  const handleAddProduct = async () => {
    try {
      if (!formData.name || !formData.price) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      const result = await addProduct(formData);
      if (result.success) {
        await fetchProducts(); // Refresh the list
        setShowModal(false);
        showNotification("Product added successfully!", "success");
      } else {
        showNotification(result.error || "Failed to add product", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification("Failed to add product", "error");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!formData.name || !formData.price) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      const result = await updateProduct(selectedItem.id, formData);
      if (result.success) {
        await fetchProducts(); // Refresh the list
        setShowModal(false);
        showNotification("Product updated successfully!", "success");
      } else {
        showNotification(result.error || "Failed to update product", "error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification("Failed to update product", "error");
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const result = await deleteProduct(id);
      if (result.success) {
        await fetchProducts(); // Refresh the list
        showNotification("Product deleted successfully!", "success");
      } else {
        showNotification(result.error || "Failed to delete product", "error");
      }
    }
  };

  const handleToggleAvailable = async (item) => {
    const result = await toggleProductAvailability(item.id, item.available);
    if (result.success) {
      await fetchProducts(); // Refresh the list
      showNotification(result.message, "success");
    } else {
      showNotification(result.error || "Failed to update status", "error");
    }
  };

  const categories = ["All", "Coffee", "Tea", "Pastry", "Snack", "Beverage", "Uncategorized"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-orange-600">📝</span>
          Manage Menu
        </h1>
        <button
          onClick={handleOpenAddModal}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat 
                ? "bg-orange-600 text-white shadow-md" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-gray-600">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Featured</th>
                  <th className="text-left">Actions</th>
                 </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Coffee size={20} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                          {item.category}
                        </span>
                      </td>
                      <td className="font-semibold">${item.price?.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleToggleAvailable(item)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                            item.available 
                              ? "bg-green-100 text-green-600 hover:bg-green-200" 
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          {item.available ? "Available" : "Unavailable"}
                        </button>
                      </td>
                      <td>
                        {item.featured ? (
                          <span className="text-yellow-600">★ Featured</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleOpenEditModal(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item.id, item.name)}
                            className="text-red-600 hover:text-red-800 p-1 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal - same as before */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="e.g., Matcha Latte"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select Category</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Tea">Tea</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Snack">Snack</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows="3"
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={modalMode === "add" ? handleAddProduct : handleUpdateProduct}
                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {modalMode === "add" ? "Add Product" : "Update Product"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ================= DASHBOARD CONTENT =================
const DashboardContent = ({ stats, userEmail }) => (
  <>
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
      <Coffee className="text-orange-600" />
      Welcome Back, Admin! 👋
    </h1>

    <div className="grid md:grid-cols-4 gap-6 mb-10">
      <Card title="Revenue" value={`$${stats.totalRevenue}`} color="from-yellow-700 to-yellow-800" icon="💰" />
      <Card title="Orders" value={stats.totalOrders} color="from-yellow-700 to-yellow-800" icon="📦" />
      <Card title="Products" value={stats.totalProducts} color="from-yellow-700 to-yellow-800" icon="🍽️" />
      <Card title="Users" value={stats.totalUsers} color="from-yellow-700 to-yellow-800" icon="👥" />
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-800 rounded-full"></span>
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all">
          <Plus className="mx-auto mb-2 text-orange-600" />
          <span>Add Product</span>
        </button>
        <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all">
          <Eye className="mx-auto mb-2 text-orange-600" />
          <span>View Orders</span>
        </button>
      </div>
    </div>
  </>
);

// ================= ORDERS CONTENT =================
const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const result = await getAllOrders();
    if (result.success) {
      setOrders(result.data);
    }
    setLoading(false);
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filter.toLowerCase());

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-600";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="text-orange-600">📦</span>
        Orders Management
      </h1>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Orders</h2>
          <div className="flex gap-2">
            <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-lg ${filter === "all" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>All</button>
            <button onClick={() => setFilter("pending")} className={`px-3 py-1 rounded-lg ${filter === "pending" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>Pending</button>
            <button onClick={() => setFilter("processing")} className={`px-3 py-1 rounded-lg ${filter === "processing" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>Processing</button>
            <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded-lg ${filter === "completed" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>Completed</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-3 text-left">Order ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Items</th>
              <th className="text-left">Total</th>
              <th className="text-left">Date</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
             </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{order.id.slice(0, 8)}</td>
                <td>{order.userName || "Unknown"}</td>
                <td>{order.items?.length || 0} items</td>
                <td className="font-semibold">${order.total?.toFixed(2) || 0}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td><span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>{order.status || "Pending"}</span></td>
                <td><button className="text-orange-600 hover:text-orange-800">View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ================= CUSTOMERS CONTENT =================
const CustomersContent = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const result = await getAllUsers();
    if (result.success) {
      setCustomers(result.data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="text-orange-600">👥</span>
        Customer Management
      </h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
             </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{customer.id.slice(0, 8)}</td>
                <td className="font-medium">{customer.name || "N/A"}</td>
                <td>{customer.email}</td>
                <td><span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{customer.role || "user"}</span></td>
                <td><button className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ================= ANALYTICS CONTENT =================
const AnalyticsContent = ({ stats }) => (
  <div>
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
      <span className="text-orange-600">📈</span>
      Analytics Dashboard
    </h1>
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between"><span>Total Revenue</span><span className="text-2xl font-bold text-orange-600">${stats.totalRevenue}</span></div>
          <div className="flex justify-between"><span>Total Orders</span><span className="text-2xl font-bold">{stats.totalOrders}</span></div>
          <div className="flex justify-between"><span>Total Products</span><span className="text-2xl font-bold">{stats.totalProducts}</span></div>
          <div className="flex justify-between"><span>Total Users</span><span className="text-2xl font-bold">{stats.totalUsers}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Average Order Value</h3>
        <div className="text-center py-8">
          <span className="text-4xl font-bold text-orange-600">
            ${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0}
          </span>
          <p className="text-gray-500 mt-2">per order</p>
        </div>
      </div>
    </div>
  </div>
);

// ================= SETTINGS CONTENT =================
const SettingsContent = () => {
  const [settings, setSettings] = useState({ storeName: "Coffee Shop Admin", currency: "USD", taxRate: 10 });
  const handleSave = () => alert("Settings saved successfully!");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><span className="text-orange-600">⚙️</span>Settings</h1>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="space-y-6">
          <div><label className="block text-sm font-medium mb-2">Store Name</label><input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400" /></div>
          <div><label className="block text-sm font-medium mb-2">Currency</label><select value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})} className="w-full border rounded-lg px-3 py-2"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="KHR">KHR (៛)</option></select></div>
          <div><label className="block text-sm font-medium mb-2">Tax Rate (%)</label><input type="number" value={settings.taxRate} onChange={(e) => setSettings({...settings, taxRate: e.target.value})} className="w-full border rounded-lg px-3 py-2" /></div>
          <button onClick={handleSave} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

// ================= REUSABLE COMPONENTS =================
const MenuItem = ({ title, open, active, icon, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${active ? "bg-white text-orange-600 font-semibold shadow-md" : "hover:bg-orange-700 hover:translate-x-1"}`}>
    <span className="text-lg">{icon}</span>
    {open && <span>{title}</span>}
  </div>
);

const Card = ({ title, value, color, icon }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group`}>
    <div className="flex justify-between items-start"><p className="opacity-80 text-sm">{title}</p><span className="text-2xl opacity-50 group-hover:scale-110 transition-transform">{icon}</span></div>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
    <div className="mt-2 text-xs opacity-75 flex items-center gap-1"><span>↑</span> +12% from last month</div>
  </div>
);

export default Dashboard;