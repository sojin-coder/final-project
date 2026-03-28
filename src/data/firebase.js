

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"; // 1. ត្រូវថែមបន្ទាត់នេះ

// const firebaseConfig = {
//   apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
//   authDomain: "my-website-cms.firebaseapp.com",
//   projectId: "my-website-cms",
//   storageBucket: "my-website-cms.firebasestorage.app",
//   messagingSenderId: "344143826164",
//   appId: "1:344143826164:web:86556e46a537b4ceade2a1",
//   measurementId: "G-NJ9H7R8RGY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Services
// export const auth = getAuth(app);
// export const db = getFirestore(app); // 2. បង្កើត និង export db ចេញទៅប្រើ
// export const analytics = getAnalytics(app);

// export default app;
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
  authDomain: "my-website-cms.firebaseapp.com",
  projectId: "my-website-cms",
  storageBucket: "my-website-cms.firebasestorage.app",
  messagingSenderId: "344143826164",
  appId: "1:344143826164:web:86556e46a537b4ceade2a1",
  measurementId: "G-NJ9H7R8RGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;

// ================= PRODUCT FUNCTIONS =================

// Get all products
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: error.message };
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return { success: false, error: error.message };
  }
};

// Get single product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);
    
    if (snapshot.exists()) {
      return { success: true, data: { id: snapshot.id, ...snapshot.data() } };
    } else {
      return { success: false, error: "Product not found" };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: error.message };
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, "products");
    
    const newProduct = {
      name: productData.name,
      price: parseFloat(productData.price),
      category: productData.category || "Uncategorized",
      description: productData.description || "",
      image: productData.image || "",
      available: productData.available !== undefined ? productData.available : true,
      featured: productData.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(productsRef, newProduct);
    
    return { 
      success: true, 
      data: { id: docRef.id, ...newProduct },
      message: "Product added successfully!"
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: error.message };
  }
};

// Update product
export const updateProduct = async (productId, updateData) => {
  try {
    const productRef = doc(db, "products", productId);
    
    const updatedProduct = {
      name: updateData.name,
      price: parseFloat(updateData.price),
      category: updateData.category || "Uncategorized",
      description: updateData.description || "",
      image: updateData.image || "",
      available: updateData.available !== undefined ? updateData.available : true,
      featured: updateData.featured || false,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(productRef, updatedProduct);
    
    return { 
      success: true, 
      message: "Product updated successfully!" 
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }
};

// Delete product
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    
    return { 
      success: true, 
      message: "Product deleted successfully!" 
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};

// Toggle product availability
export const toggleProductAvailability = async (productId, currentStatus) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      available: !currentStatus,
      updatedAt: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: `Product ${!currentStatus ? "available" : "unavailable"} successfully!` 
    };
  } catch (error) {
    console.error("Error toggling product availability:", error);
    return { success: false, error: error.message };
  }
};

// ================= ORDER FUNCTIONS =================

// Get all orders
export const getAllOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: error.message };
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: status,
      updatedAt: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: "Order status updated successfully!" 
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: error.message };
  }
};

// ================= USER FUNCTIONS =================

// Get all users
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: error.message };
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", role));
    const snapshot = await getDocs(q);
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users by role:", error);
    return { success: false, error: error.message };
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: role,
      updatedAt: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: "User role updated successfully!" 
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }
};

// ================= CATEGORY FUNCTIONS =================

// Get all categories
export const getAllCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const snapshot = await getDocs(categoriesRef);
    
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: error.message };
  }
};

// Add new category
export const addCategory = async (categoryData) => {
  try {
    const categoriesRef = collection(db, "categories");
    const newCategory = {
      name: categoryData.name,
      description: categoryData.description || "",
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(categoriesRef, newCategory);
    
    return { 
      success: true, 
      data: { id: docRef.id, ...newCategory },
      message: "Category added successfully!" 
    };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, error: error.message };
  }
};

// Delete category
export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await deleteDoc(categoryRef);
    
    return { 
      success: true, 
      message: "Category deleted successfully!" 
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }
};

// ================= STATS FUNCTIONS =================

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    // Get total users
    const usersSnapshot = await getDocs(collection(db, "users"));
    const totalUsers = usersSnapshot.size;
    
    // Get total orders
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const totalOrders = ordersSnapshot.size;
    
    // Calculate total revenue
    let totalRevenue = 0;
    ordersSnapshot.forEach(doc => {
      const order = doc.data();
      if (order.total) {
        totalRevenue += order.total;
      }
    });
    
    // Get total products
    const productsSnapshot = await getDocs(collection(db, "products"));
    const totalProducts = productsSnapshot.size;
    
    return { 
      success: true, 
      data: {
        totalUsers,
        totalOrders,
        totalRevenue,
        totalProducts
      }
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: error.message };
  }
};

// ================= IMAGE UPLOAD FUNCTIONS =================

// Upload product image
export const uploadProductImage = async (file, productId) => {
  try {
    const storageRef = ref(storage, `products/${productId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
};

// Delete product image
export const deleteProductImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    
    return { success: true, message: "Image deleted successfully!" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};

// ================= HELPER FUNCTIONS =================

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    
    const products = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return { success: true, data: products };
  } catch (error) {
    console.error("Error searching products:", error);
    return { success: false, error: error.message };
  }
};

// Bulk delete products
export const bulkDeleteProducts = async (productIds) => {
  try {
    const promises = productIds.map(id => deleteDoc(doc(db, "products", id)));
    await Promise.all(promises);
    
    return { 
      success: true, 
      message: `${productIds.length} products deleted successfully!` 
    };
  } catch (error) {
    console.error("Error bulk deleting products:", error);
    return { success: false, error: error.message };
  }
};

// Get recent orders
export const getRecentOrders = async (limit = 5) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const orders = snapshot.docs.slice(0, limit).map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return { success: false, error: error.message };
  }
};

// Get top selling products
export const getTopSellingProducts = async (limit = 5) => {
  try {
    // This is a simplified version - you might need to aggregate from orders
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by some criteria (e.g., featured or most ordered)
    const topProducts = products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, limit);
    
    return { success: true, data: topProducts };
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return { success: false, error: error.message };
  }
};