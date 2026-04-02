import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 

  ShoppingBag, 
  CreditCard, 
  Minus, 
  Plus,
  X,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

const snacks = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  // States for Buy Now Modal
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

     
const products = [
  {
    id: 1,
    title: "Cookie Christmas",
    price: 5.00,
    likes: 40,
    image:
      " https://i.pinimg.com/736x/80/dc/65/80dc65869e4bb1cb6b63373714e7dc4f.jpg",
  },
  {
    id: 2,
    title: "Potato chips",
    price: 6.99,
    likes: 40,
    image:
      " https://i.pinimg.com/1200x/cb/21/0e/cb210ecf1cd1bb3ca6a18085dd8cab34.jpg",
  },
  {
    id: 3,
    title: "Ultimate Creamy Chicken Sandwich",
    price: 7.00,
    likes: 40,
    image:
      " https://i.pinimg.com/736x/06/a9/56/06a956b8ebedde8c5c7d5fe5213f905c.jpg",
  },
  {
    id: 4,
    title: "Irish Chicken Fillet Roll ",
    price: 3.00,
    likes: 40,
    image:
      " https://i.pinimg.com/1200x/70/85/e3/7085e3f8ca20f30165eac96ce0a7fa88.jpg",
  },
  {
    id: 5,
    title: "Delicious Fast Food",
    price: 2.50,
    likes: 40,
    image:
      "https://i.pinimg.com/1200x/0e/79/8f/0e798f785d8455fe7edffaed98d6a42c.jpg",
  },
  {
    id: 6,
    title: "Burger",
    price: 2.90,
    likes: 40,
    image:
      " https://i.pinimg.com/1200x/ae/a5/57/aea557b4288c0602c0ba532152911aef.jpg",
  },
  {
    id: 7,
    title: "Crispy Samosa Pinwheels",
    price: 4.90,
    likes: 40,
    image:
      "https://i.pinimg.com/1200x/c2/0e/53/c20e53eac4369bbccf1a4b2a2dde5a5e.jpg ",
  },
  {
    id: 8,
    title: "Small cake",
    price: 6.70,
    likes: 40,
    image:
      "https://i.pinimg.com/1200x/97/ea/0c/97ea0c2a71d5fb275f495cfba44a6fd2.jpg ",
  },
  {
    id: 9,
    title: "croissants",
    price: 5.00,
    likes: 40,
    image:
      " https://i.pinimg.com/736x/b7/ae/63/b7ae63331d303e5f5124f0d5e56d05c2.jpg",
  },
  {
    id: 10,
    title: "Cake",
    price:5.90,
    likes: 40,
    image:
      " https://i.pinimg.com/736x/64/25/17/642517be65141ddc1e1a9c3f2012280f.jpg",
  },
  {
    id: 11,
    title: "Cake",
    price: 4.50,
    likes: 40,
    image:
      " https://i.pinimg.com/736x/8e/77/8e/8e778eb0a549b2f5fc8d08c5c272bb0c.jpg",
  },
  {
    id: 12,
    title: "sliced bread",
    price:8.90,
    likes: 40,
    image:
      "https://i.pinimg.com/736x/7f/ce/7a/7fce7afbf66cf7fa520a560eb50a6e8f.jpg ",
  },
];

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Add to cart function
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    // Show success feedback
    const btn = document.getElementById(`add-btn-${item.id}`);
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-600');
      setTimeout(() => {
        btn.classList.remove('scale-110', 'bg-green-600');
      }, 300);
    }
  };

  // Buy now function
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setBuyQuantity(1);
    setShowBuyModal(true);
  };

  // Confirm buy now
  const confirmBuyNow = () => {
    if (selectedItem && buyQuantity > 0) {
      const buyNowCart = [{ ...selectedItem, quantity: buyQuantity }];
      localStorage.setItem('cartItems', JSON.stringify(buyNowCart));
      setShowBuyModal(false);
      navigate('/pay', { state: { cartItems: buyNowCart } });
    }
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Update quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      const updatedCart = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    }
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('សូមបញ្ជាទិញមុខម្ហូបជាមុនសិន!');
      return;
    }
    navigate('/pay', { state: { cartItems: cartItems } });
  };
// ----product show
  const ProductCard = ({ item }) => {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Like Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black text-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
          👍 {item.likes}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h2 className="text-lg font-semibold mb-3">{item.title}</h2>

          <div className="flex items-center justify-between gap-2">
            <span className="border border-gray-300 px-3 py-1 rounded-full text-sm">
              ${item.price.toFixed(2)}
            </span>

            <div className="flex gap-2">
              <button
                id={`add-btn-${item.id}`}
                onClick={() => addToCart(item)}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-all flex items-center gap-1"
                title="Add to Cart"
              >
                <ShoppingBag size={16} />
                Cart
              </button>
              
              <button
                onClick={() => handleBuyNow(item)}
                className="border border-orange-400 text-orange-400 px-3 py-1 rounded-full text-sm hover:bg-orange-400 hover:text-white transition-all flex items-center gap-1"
              >
                <CreditCard size={16} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen mt-[80px]  pb-16'>
      {/* Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-amber-700 text-white p-4 rounded-full shadow-2xl hover:bg-amber-800 transition-all transform hover:scale-110 relative"
        >
          <ShoppingBag size={28} />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-amber-700" />
                  Your basket
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your basket is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-30 h-30 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-amber-700 font-bold">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold mb-2">
                      <span>Total</span>
                      <span className="text-amber-700">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax (10%)</span>
                      <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                      <span>total amount</span>
                      <span className="text-amber-700">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white py-3 rounded-xl font-semibold hover:from-amber-800 hover:to-amber-900 transition-all transform hover:scale-105"
                  >
                   Confirm order →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-10 text-sm flex-wrap px-4">
        <div className="flex justify-center gap-4 mb-10 text-sm flex-wrap px-4">
  <Link 
    to="/menu"
    className={`text-lg px-6 py-2 rounded-full transition-all ${
      location.pathname === '/' 
        ? 'bg-amber-600 text-white shadow-lg' 
        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600'
    }`}
  >
    All
  </Link>
  
  <Link 
    to="/coffee"
    className={`text-lg px-6 py-2 rounded-full transition-all ${
      location.pathname === '/coffee' 
        ? 'bg-amber-600 text-white shadow-lg' 
        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600'
    }`}
  >
    Coffee
  </Link>
  
  <Link 
    to="/snack"
    className={`text-lg px-6 py-2 rounded-full transition-all ${
      location.pathname === '/snack' 
        ? 'bg-amber-600 text-white shadow-lg' 
        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600'
    }`}
  >
    Snacks
  </Link>
  
  <Link 
    to="/drink"
    className={`text-lg px-6 py-2 rounded-full transition-all ${
      location.pathname === '/drink' 
        ? 'bg-amber-600 text-white shadow-lg' 
        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600'
    }`}
  >
    Drinks
  </Link>
   <Link 
      to="/coffeebean"
      className={`text-lg px-6 py-2 rounded-full transition-all ${
        location.pathname === '/coffeebean' 
          ? 'bg-amber-600 text-white shadow-lg' 
          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600'
      }`}
    >
      Coffee Beans 
    </Link>
</div>
      </div>

      {/* Products Grid */}
      <div className="mt-10 mb-20 px-4">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {showBuyModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <CreditCard className="text-amber-700" />
                ទិញភ្លាមៗ
              </h3>
              <button
                onClick={() => setShowBuyModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex gap-4 mb-4 p-4 bg-amber-50 rounded-xl">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">{selectedItem.title}</p>
                <p className="text-amber-700 font-bold text-xl mt-1">
                  ${selectedItem.price.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                បរិមាណ:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBuyQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-gray-200 rounded-lg py-2 text-lg font-semibold"
                  min="1"
                />
                <button
                  onClick={() => setBuyQuantity(prev => prev + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">total amount:</span>
                <span className="text-2xl font-bold text-amber-700">
                  ${(selectedItem.price * buyQuantity).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">*Add 10% tax when paying.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmBuyNow}
                className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 py-3 rounded-xl hover:from-amber-800 hover:to-amber-900 transition-all font-semibold"
              >
                Confirm purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default snacks;