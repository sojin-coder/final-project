import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, ShoppingBag, Minus, Plus, X, Trash2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import AOS from "aos";
import "aos/dist/aos.css";

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const drinks = [
  { image: "https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg", title: "Hot matcha", price: 10.90, likes: 50 },
  { image: "https://i.pinimg.com/1200x/e2/c0/91/e2c09146cb0ea1c44b205bb4a004ca84.jpg", title: "Matcha Latte Recipe", price: 10.00, likes: 200 },
  { image: "https://i.pinimg.com/736x/aa/8d/2d/aa8d2de36c7e1cace188932bb0d9a7e4.jpg", title: "ice Lemon Tea", price: 5.00, likes: 40 },
  { image: "https://i.pinimg.com/1200x/1f/e3/88/1fe388f7417f1c9fec6e4830423b2b22.jpg", title: "Milk tea", price: 5.00, likes: 40 },
  { image: "https://i.pinimg.com/736x/72/15/d2/7215d262faaf0b135b21a2475e7cfe25.jpg", title: "Matcha Strawberry", price: 10.00, likes: 100 },
  { image: "https://i.pinimg.com/1200x/c5/b4/83/c5b48330ca15082aa46e3a29677a442c.jpg", title: "Taro Milk Tea", price: 10.00, likes: 50 },
  { image: "https://i.pinimg.com/736x/1f/92/5e/1f925e6b3751d194cc96e00af710f0bc.jpg", title: "Chocolate milkshake", price: 12.00, likes: 200 },
//   { image: "https://i.pinimg.com/1200x/bc/ff/c0/bcffc047d62ea4b955da5695799737a8.jpg", title: "Chocolate milkshake", price: 8.00, likes: 990 },
  { image: "https://i.pinimg.com/1200x/d3/32/d9/d332d9179ff7c342b1afda7b68502a36.jpg", title: "Healthy Blueberry Smoothie", price: 10.00, likes: 500 },
  { image: "https://i.pinimg.com/736x/81/2b/8d/812b8dade62cf46dda16fdcdbb8996de.jpg", title: "Lemon Tea hot", price: 9.30, likes: 560 },
  { image: "https://i.pinimg.com/736x/c2/d3/8a/c2d38a1a3141926e8a5fe94e27a8d2f5.jpg", title: "Creamy Strawberry", price: 10.30, likes: 500 },
 
  { image: "https://i.pinimg.com/736x/8f/dd/37/8fdd373d0627c75c51eabe85d6991f0d.jpg", title: "Epic Chocolate Peanut", price: 7.00, likes: 50 },
];

const Drinks_Menu = () => {
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Functional States
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // States for Buy Now Modal
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
 useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100, easing: 'ease-in-out' });
  }, []);

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
  

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

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

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Drinks Menu</h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 text-lg">It is the most popular type of soft drink in the store.</p>
        </div>

        {/* Swiper Implementation */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {drinks.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div data-aos="zoom-in" data-aos-delay={index * 100} className="relative h-[450px] overflow-hidden rounded-3xl group cursor-pointer shadow-xl bg-white">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" />
                      <span className="ml-1 text-white font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-amber-400">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    {/* <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="p-3 bg-white/20 hover:bg-amber-600 rounded-full transition-all backdrop-blur-sm">
                      <ShoppingBag size={24} />
                    </button> */}
                    <button onClick={(e) => { e.stopPropagation(); handleBuyNow(item); }} className="px-8 py-3 bg-amber-700 text-white rounded-2xl font-bold hover:bg-amber-800 transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Bottom Label (Visible when not hovering) */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent py-6 text-center group-hover:opacity-0 transition-opacity duration-500">
                  <span className="text-white text-xl font-semibold">{item.title}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Floating Cart Button */}
      {/* <button onClick={() => setShowCart(true)} className="fixed bottom-8 right-8 bg-amber-800 text-white p-5 rounded-full shadow-2xl z-40">
        <ShoppingBag size={28} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        )}
      </button> */}

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
                     <button onClick={() => setBuyQuantity(q => Math.max(1, q - 1))} className="p-3 bg-gray-100 rounded-full"><Minus /></button>
                     <span className="text-2xl font-bold">{buyQuantity}</span>
                     <button onClick={() => setBuyQuantity(q => q + 1)} className="p-3 bg-gray-100 rounded-full"><Plus /></button>
                   </div>
                   <button onClick={confirmBuyNow} className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold">បញ្ជាក់ការទិញ (${(selectedItem.price * buyQuantity).toFixed(2)})</button>
                 </div>
               </div>
             )}
           </div>
     
    
  );
};

export default Drinks_Menu;