import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Coffee, Popcorn, CupSoda } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import AOS from "aos";
import "aos/dist/aos.css";
import ProductSlide from "../components/ProductSlide";
import FeaturedPage from "../components/FeaturedPage";

// Assets
import myImage from '../assets/image/222.png';
import ImageOverlay from '../assets/image/coffe-page.png';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const menuItems = [
  {
    id: 1,
    title: "Late Coffee",
    description: "Best bays with late Coffee",
    price: "$ 5.30",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Espresso",
    description: "Strong and bold espresso",
    price: "$ 5.30",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=387&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Coffee Ice",
    description: "Refreshing cold coffee ice",
    price: "$ 5.30",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=387&auto=format&fit=crop",
  }
];

const images = [
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-1.jpg",
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-2.jpg",
  "https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/home-1-slider-image-3.jpg"
];

// Category Data
const categories = [
  { icon: <CupSoda size={50} />, label: "Drinks", count: "30 Courses", color: "blue" },
  { icon: <Popcorn size={50} />, label: "Snacks", count: "50 Courses", color: "green" },
  { icon: <Coffee size={50} />, label: "Coffee", count: "15 Courses", color: "amber" },
];

// Coffee Beans Data
const coffeeBeans = [
  {
    image: "https://images.unsplash.com/photo-1559056199-6419aac0b55e?q=80&w=500&auto=format&fit=crop",
    title: "Arabica Beans",
    price: "$5.00",
    likes: "40",
  },
  {
    image: "https://images.unsplash.com/photo-1599639932525-213272ff954b?q=80&w=788&auto=format&fit=crop",
    title: "Robusta Beans",
    price: "$10.00",
    likes: "50",
  },
  {
    image: "https://images.unsplash.com/photo-1598483604448-fa50403fcd25?q=80&w=774&auto=format&fit=crop",
    title: "Liberica Beans",
    price: "$8.50",
    likes: "100",
  },
  {
    image: "https://images.unsplash.com/photo-1661668998444-7470e87e468c?q=80&w=870&auto=format&fit=crop",
    title: "Excelsa Beans",
    price: "$20.00",
    likes: "1k",
  },
  {
    image: "https://images.unsplash.com/photo-1605711599412-775918dbe770?q=80&w=651&auto=format&fit=crop",
    title: "Peaberry Beans",
    price: "$15.00",
    likes: "49",
  },
  {
    image: "https://images.unsplash.com/photo-1583441012461-abcc0bd2400d?q=80&w=387&auto=format&fit=crop",
    title: "Blue Mountain",
    price: "$8.20",
    likes: "400",
  },
  {
    image: "https://images.unsplash.com/photo-1658980356502-86abf6d5d5a8?q=80&w=387&auto=format&fit=crop",
    title: "Kenyan Beans",
    price: "$19.00",
    likes: "70",
  },
];

// Drinks Data
const drinks = [
  {
    image: "https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg",
    title: "Coffee latte",
    price: "$5.00",
    likes: "40",
  },
  {
    image: "https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg",
    title: "Cappuccino",
    price: "$10.00",
    likes: "100",
  },
  {
    image: "https://i.pinimg.com/736x/bd/c4/4b/bdc44b6700ece11ff713ee133803f371.jpg",
    title: "Caramel Ice Cream Coffee",
    price: "$10.00",
    likes: "50",
  },
  {
    image: "https://i.pinimg.com/1200x/81/de/70/81de70fd36f7dfad4e2fb71642863924.jpg",
    title: "Coffee Milkshake",
    price: "$12.00",
    likes: "200",
  },
  {
    image: "https://i.pinimg.com/1200x/bc/ff/c0/bcffc047d62ea4b955da5695799737a8.jpg",
    title: "Chocolate milkshake",
    price: "$8.00",
    likes: "990",
  },
  {
    image: "https://i.pinimg.com/1200x/d3/32/d9/d332d9179ff7c342b1afda7b68502a36.jpg",
    title: "Healthy Blueberry Smoothie",
    price: "$10.00",
    likes: "500",
  },
  {
    image: "https://i.pinimg.com/736x/4c/28/e2/4c28e2420bf38c50120dba0cbaf42e8d.jpg",
    title: "Espresso Coffee",
    price: "$8.00",
    likes: "550",
  },
  {
    image: "https://i.pinimg.com/1200x/56/27/50/562750b2c8e0b7e680d90a97f0e56b4b.jpg",
    title: "Americano Coffee",
    price: "$5.00",
    likes: "50k",
  },
  {
    image: "https://i.pinimg.com/736x/54/4c/05/544c05e2212a31de1158907f6f0fac0e.jpg",
    title: "Italian coffee",
    price: "$9.30",
    likes: "560",
  },
  {
    image: "https://i.pinimg.com/474x/57/30/51/5730512538c6c2c357d239c7a55c3e45.jpg",
    title: "Hot coffee weather",
    price: "$10.30",
    likes: "500",
  },
  {
    image: "https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg",
    title: "Hot matcha",
    price: "$10.90",
    likes: "50",
  },
  {
    image: "https://i.pinimg.com/1200x/e2/c0/91/e2c09146cb0ea1c44b205bb4a004ca84.jpg",
    title: "Matcha Latte Recipe",
    price: "$10.00",
    likes: "200",
  },
  {
    image: "https://i.pinimg.com/736x/8f/dd/37/8fdd373d0627c75c51eabe85d6991f0d.jpg",
    title: "Epic Chocolate Peanut",
    price: "$7.00",
    likes: "50",
  },
];

// Snacks Data
const snacks = [
  {
    image: "https://i.pinimg.com/736x/2d/4b/f6/2d4bf6cd6d4e5b7667b799de6615a837.jpg",
    title: "Crispy Samosa Pinwheels",
    price: "$3.00",
    likes: "505",
  },
  {
    image: "https://i.pinimg.com/736x/1c/c1/df/1cc1df0fcce77849fadcd01c7bb8d5da.jpg",
    title: "Palm cake",
    price: "$2.80",
    likes: "300",
  },
  {
    image: "https://i.pinimg.com/1200x/95/0a/0a/950a0a62dcebd0b0d9721751c7367d0e.jpg",
    title: "Vanilla Cupcakes",
    price: "$2.00",
    likes: "150",
  },
  {
    image: "https://i.pinimg.com/1200x/6e/63/e1/6e63e10e08856db51071176b74c1b74b.jpg",
    title: "Delicious Cruffins",
    price: "$5.00",
    likes: "350",
  },
  {
    image: "https://i.pinimg.com/1200x/3b/01/22/3b012248c9c07cec0e55f50e7e70a88a.jpg",
    title: "Brunch",
    price: "$9.00",
    likes: "150",
  },
  {
    image: "https://i.pinimg.com/736x/c6/57/44/c6574478d3aade47b488516626ae5b53.jpg",
    title: "Japanese fluffy pancakes",
    price: "$1.90",
    likes: "450",
  },
  {
    image: "https://i.pinimg.com/736x/a5/28/64/a52864acd60be934593adb7a88505ff6.jpg",
    title: "Fluffy Strawberry Nutella Pancakes",
    price: "$10.00",
    likes: "560",
  },
  {
    image: "https://i.pinimg.com/736x/9b/fe/d4/9bfed48fc5c70bd52b98cfc5c72b22f9.jpg",
    title: "Cake",
    price: "$4.50",
    likes: "502",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  // Auto slide for hero section
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(slider);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mt-[-40px]">
      {/* HERO SECTION */}
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <img 
            data-aos="zoom-in"
            data-aos-delay="200"
            src={myImage} 
            alt="Logo" 
            className="w-[120px] md:w-[200px] mb-4" 
          />
          <h1 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-white text-5xl md:text-7xl font-bold tracking-tighter"
          >
            COFFEE FACTORY
          </h1>
          <img 
            data-aos="fade-up"
            data-aos-delay="600"
            src={ImageOverlay} 
            alt="Featured" 
            className="w-[200px] md:w-[250px] object-contain​ mt-[-80px]"
          />
          <p 
            data-aos="fade-up"
            data-aos-delay="800"
            className="text-gray-200 max-w-2xl text-lg italic mt-[-60px]"
          >
            "Real coffee flavor, extracted from 100% natural beans."
          </p>
          <button 
            data-aos="zoom-in"
            data-aos-delay="1000"
            className="mt-8 px-10 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 transition-all transform hover:scale-105 shadow-2xl"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div 
        data-aos="fade-up"
        className="bg-gradient-to-br from-pink-50 to-amber-50 py-16 px-4"
      >
        <h2 
          data-aos="fade-up"
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          All menus in the store
        </h2>
        <p 
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-center text-gray-600 mb-12 text-lg"
        >
          Choose from our wide variety of drinks and snacks.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center hover:scale-105 transition-all duration-500 cursor-pointer group"
            >
              <div className={`w-24 h-24 bg-${cat.color}-50 text-${cat.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-2xl mb-2">{cat.label}</h3>
              <p className="text-gray-500 text-lg">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIAL MENU SECTION */}
      <div 
        data-aos="fade-up"
        className="bg-[#FDE7D9] py-20 px-4"
      >
        <div className="text-center mb-12">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Special menu for restaurants
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-600 text-lg"
          >
            The most popular menu chosen by our guests.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              data-aos="flip-left"
              data-aos-delay={index * 200}
              className="relative h-[450px] overflow-hidden rounded-3xl group cursor-pointer shadow-xl"
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            >
              <img 
                src={item.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.title}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                <p className="text-center text-gray-300 mb-4">{item.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-yellow-400">
                    <Star size={20} fill="currentColor" />
                    <span className="ml-1 text-white font-semibold">{item.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">{item.price}</span>
                </div>
                
                <button className="bg-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                  Buy Now
                </button>
              </div>

              {/* Bottom Title */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent py-6 text-center group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-white text-xl font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COFFEE BEANS SECTION */}
      <div 
        data-aos="fade-up"
        className="max-w-6xl mx-auto py-20 px-4"
      >
        <div className="text-center mb-12">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Coffee Beans
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-600 text-lg"
          >
            The most popular type of coffee beans in the store.
          </p>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper px-4"
        >
          {coffeeBeans.map((bean, index) => (
            <SwiperSlide key={index}>
              <div data-aos="zoom-in" data-aos-delay={index * 50}>
                <ProductSlide 
                  image={bean.image}
                  title={bean.title}
                  price={bean.price}
                  likes={bean.likes}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DRINKS MENU SECTION */}
      <div 
        data-aos="fade-up"
        className="max-w-6xl mx-auto py-20 px-4"
      >
        <div className="text-center mb-12">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Drinks Menu
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-600 text-lg"
          >
            It is the most popular type of soft drink in the store.
          </p>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper px-4"
        >
          {drinks.map((drink, index) => (
            <SwiperSlide key={index}>
              <div data-aos="zoom-in" data-aos-delay={index * 50}>
                <ProductSlide 
                  image={drink.image}
                  title={drink.title}
                  price={drink.price}
                  likes={drink.likes}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* SNACKS MENU SECTION */}
      <div 
        data-aos="fade-up"
        className="max-w-6xl mx-auto py-20 px-4"
      >
        <div className="text-center mb-12">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Snacks Menu
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-600 text-lg"
          >
            It is the most popular snack type in the store.
          </p>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper px-4"
        >
          {snacks.map((snack, index) => (
            <SwiperSlide key={index}>
              <div data-aos="zoom-in" data-aos-delay={index * 50}>
                <ProductSlide 
                  image={snack.image}
                  title={snack.title}
                  price={snack.price}
                  likes={snack.likes}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FEATURED PAGE */}
      <div 
        data-aos="fade-up"
        className="mt-10 mb-10"
      >
        <FeaturedPage />
      </div>
    </div>
  );
};

export default Home;