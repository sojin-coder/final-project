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

const coffeeBeans = [
  { id: 1, image: "https://i.pinimg.com/1200x/e5/25/cd/e525cd5c9f4a6d02edeb71483041406e.jpg", title: "Arabica Beans", price: 5.00, rating: 4.8 },
  { id: 2, image: "https://images.unsplash.com/photo-1599639932525-213272ff954b?q=80&w=788&auto=format&fit=crop", title: "Robusta Beans", price: 10.00, rating: 4.5 },
  { id: 3, image: "https://images.unsplash.com/photo-1598483604448-fa50403fcd25?q=80&w=774&auto=format&fit=crop", title: "Liberica Beans", price: 8.50, rating: 4.2 },
  { id: 4, image: "https://images.unsplash.com/photo-1661668998444-7470e87e468c?q=80&w=870&auto=format&fit=crop", title: "Excelsa Beans", price: 20.00, rating: 4.7 },
  { id: 5, image: "https://i.pinimg.com/736x/e6/e9/f2/e6e9f2fe9778732433b6f61ed1d7d404.jpg", title: "Peaberry Beans", price: 15.00, rating: 4.9 },
  { id: 6, image: "https://i.pinimg.com/1200x/23/64/bd/2364bd87bb5664dd3b5f05a3d3ea1eeb.jpg", title: "Peaberry Beans", price: 15.00, rating: 4.9 },
  { id: 7, image: "https://i.pinimg.com/736x/aa/30/b6/aa30b607182531031c45d3a7acf0b829.jpg", title: "Peaberry Beans", price: 15.00, rating: 4.9 },
];

const Coffee_Beans = () => {
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
          <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Coffee Beans Collection</h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 text-lg">Experience the finest beans from around the world.</p>
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
          {coffeeBeans.map((item, index) => (
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

export default Coffee_Beans;