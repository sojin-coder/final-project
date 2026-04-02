import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { Star, Coffee, Popcorn, CupSoda ,ShoppingBag,Minus,Plus,X,} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Special_menu from "../product/Special_menu";
import Coffee_Beans from "../product/Coffee_Beans";
import Snacks_Menu from "../product/Snacks_Menu";
import Drinks_Menu from "../product/Drinks_Menu";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import ProductSlide from "../components/ProductSlide";
import FeaturedPage from "../components/FeaturedPage";

// Assets
import myImage from '../assets/image/222.png';
import ImageOverlay from '../assets/image/coffe-page.png';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// --- ទិន្នន័យ (Data) រក្សាទុកដូចដើមទាំងអស់ ---
const menuItems = [
  { id: 1, title: "Late Coffee", description: "Best bays with late Coffee", price: 5.30, rating: 3.8, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop" },
  { id: 2, title: "Espresso", description: "Strong and bold espresso", price: 5.30, rating: 4.5, image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=387&auto=format&fit=crop" },
  { id: 3, title: "Coffee Ice", description: "Refreshing cold coffee ice", price:  5.30, rating: 4.0, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=387&auto=format&fit=crop" }
];

const images = [
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-1.jpg",
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-2.jpg",
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-3.jpg"
];

const categories = [
  { icon: <CupSoda size={50} />, label: "Drink", count: "30 Courses", color: "blue" },
  { icon: <Popcorn size={50} />, label: "Snack", count: "50 Courses", color: "green" },
  { icon: <Coffee size={50} />, label: "Coffee", count: "15 Courses", color: "amber" },
];



const Home = () => {
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

    // 3. Side Effects (LocalStorage)
      useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) setCartItems(JSON.parse(savedCart));
      }, []);
    
      useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);
    
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100, easing: 'ease-in-out' });
  }, []);
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


  // 6. Filter Logic
  const filteredProducts = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(slider);
  }, []);



  return (
    <div className="bg-gray-100 min-h-screen mt-[-40px]">
      {/* HERO SECTION - Style ដើម */}
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <img data-aos="zoom-in" data-aos-delay="200" src={myImage} alt="Logo" className="w-[120px] md:w-[200px] mb-4" />
          <h1 data-aos="fade-up" data-aos-delay="400" className="text-white text-5xl md:text-7xl font-bold tracking-tighter">COFFEE FACTORY</h1>
          <img data-aos="fade-up" data-aos-delay="600" src={ImageOverlay} alt="Featured" className="w-[200px] md:w-[250px] object-contain mt-[-80px]" />
          <p data-aos="fade-up" data-aos-delay="800" className="text-gray-200 max-w-2xl text-lg italic mt-[-60px]">
            "Real coffee flavor, extracted from 100% natural beans."
          </p>
          <button data-aos="zoom-in" data-aos-delay="1000" onClick={() => navigate("/menu")} className="mt-8 px-10 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 transition-all transform hover:scale-105 shadow-2xl">
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORY SECTION - Style ដើម */}
      <div data-aos="fade-up" className="bg-gradient-to-br from-pink-50 to-amber-50 py-16 px-4">
        <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-center mb-4">All menus in the store</h2>
        <p data-aos="fade-up" data-aos-delay="200" className="text-center text-gray-600 mb-12 text-lg">Choose from our wide variety of drinks and snacks.</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 150} onClick={() => navigate(`/${cat.label.toLowerCase()}`)} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center hover:scale-105 transition-all duration-500 cursor-pointer group">
              <div className={`w-24 h-24 bg-${cat.color}-50 text-${cat.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-2xl mb-2">{cat.label}</h3>
              <p className="text-gray-500 text-lg">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIAL MENU SECTION - Style ដើម */}
      <div data-aos="fade-up" className="bg-[#FDE7D9] py-20 px-4">
        
        <Special_menu/>
        


    </div>
      <div data-aos="fade-up" className="py-20 px-4">
        
        <Coffee_Beans/>
        


    </div>
      <div data-aos="fade-up" className="py-20 px-4">
        
        <Snacks_Menu/>
        


    </div>
      <div data-aos="fade-up" className=" py-20 px-4">
        
        <Drinks_Menu/>

    </div>
          {/* FEATURED PAGE */}
      <div data-aos="fade-up" className="mt-10 mb-10">
        <FeaturedPage />
      </div>
    </div>
  );
};

export default Home;