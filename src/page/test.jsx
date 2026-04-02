import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  CreditCard, 
  Minus, 
  Plus, 
  X, 
  Trash2,
  Star
} from "lucide-react";

const DrinksPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Data State
  const menuItems = [
    { id: 1, title: "Latte Coffee", description: "Best beans with steamed milk", price: 5.30, rating: 3.8, category: "coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop" },
    { id: 2, title: "Espresso", description: "Strong and bold espresso", price: 5.30, rating: 4.5, category: "coffee", image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=387&auto=format&fit=crop" },
    { id: 3, title: "Coffee Ice", description: "Refreshing cold coffee ice", price: 5.30, rating: 4.0, category: "drink", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=387&auto=format&fit=crop" },
    { id: 4, title: "Chocolate Muffin", description: "Sweet chocolate snack", price: 2.50, rating: 4.2, category: "snack", image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=429&auto=format&fit=crop" }
  ];

  // 2. Functional States
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // States for Buy Now Modal
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);

  // 3. Side Effects (LocalStorage)
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 4. Cart Logic
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  // 5. Checkout & Buy Now Logic
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setBuyQuantity(1);
    setShowBuyModal(true);
  };

  const confirmBuyNow = () => {
    if (selectedItem) {
      const buyNowData = [{ ...selectedItem, quantity: buyQuantity }];
      navigate('/pay', { state: { cartItems: buyNowData } });
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("សូមរើសទំនិញជាមុនសិន!");
    navigate('/pay', { state: { cartItems: cartItems } });
  };

  // 6. Filter Logic
  const filteredProducts = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      
      {/* Category Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {['all', 'coffee', 'snack', 'drink'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full capitalize transition-all ${
              selectedCategory === cat 
              ? 'bg-amber-700 text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow p-4 border border-gray-100">
            <div className="relative h-48 mb-4">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="fill-amber-500 text-amber-500" /> {item.rating}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-1">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-amber-800">${item.price.toFixed(2)}</span>
              <div className="flex gap-2">
                <button onClick={() => addToCart(item)} className="p-2 bg-gray-100 rounded-full hover:bg-amber-100 text-amber-800 transition-colors">
                  <ShoppingBag size={20} />
                </button>
                <button onClick={() => handleBuyNow(item)} className="px-4 py-2 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setShowCart(true)}
        className="fixed bottom-8 right-8 bg-amber-800 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <ShoppingBag size={28} />
        {getTotalItems() > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">កន្ត្រកទំនិញ</h2>
              <button onClick={() => setShowCart(false)}><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400">មិនទាន់មានទំនិញក្នុងកន្ត្រក</div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-2xl">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt="" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.title}</h4>
                      <p className="text-amber-700 font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-white rounded-md border"><Minus size={14} /></button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-white rounded-md border"><Plus size={14} /></button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-400"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600"><span>តម្លៃសរុប</span><span>${getTotalPrice().toFixed(2)}</span></div>
                <div className="flex justify-between text-xl font-black text-amber-900 border-t pt-2"><span>សរុបមានពន្ធ (10%)</span><span>${(getTotalPrice() * 1.1).toFixed(2)}</span></div>
                <button onClick={handleCheckout} className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold hover:bg-amber-900 transition-colors">បន្តទៅការទូទាត់</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buy Now Modal */}
      {showBuyModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowBuyModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-6 overflow-hidden">
            <h3 className="text-xl font-bold mb-4">ទិញភ្លាមៗ</h3>
            <div className="flex gap-4 mb-6">
              <img src={selectedItem.image} className="w-24 h-24 object-cover rounded-2xl" alt="" />
              <div>
                <h4 className="font-bold">{selectedItem.title}</h4>
                <p className="text-amber-700 font-black text-lg">${selectedItem.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <button onClick={() => setBuyQuantity(q => Math.max(1, q-1))} className="p-3 bg-gray-100 rounded-full"><Minus /></button>
              <span className="text-2xl font-bold">{buyQuantity}</span>
              <button onClick={() => setBuyQuantity(q => q+1)} className="p-3 bg-gray-100 rounded-full"><Plus /></button>
            </div>
            <button onClick={confirmBuyNow} className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold">បញ្ជាក់ការទិញ (${(selectedItem.price * buyQuantity).toFixed(2)})</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DrinksPage;