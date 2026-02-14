import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Coffee, Popcorn, CupSoda } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react'; // បន្ថែមការ import នេះ
import { Pagination, Navigation } from 'swiper/modules';
import ProductSlide from '../components/ProductSlide'
import FeaturedPage from "../components/FeaturedPage"

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

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState(null); // សម្រាប់ទូរសព្ទពេលចុចលើរូប
  const [swiperRef, setSwiperRef] = useState(null);

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
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <img src={myImage} alt="Logo" className="w-[120px] md:w-[200px] mb-4" />
          <h1 className="text-white text-4xl md:text-7xl font-bold tracking-tighter mt-[-29px]">COFFEE FACTORY</h1>
          <img src={ImageOverlay} alt="Featured" className="w-[200px] md:w-[250px] mt-[-60px] object-contain" />
          <p className="text-gray-200 max-w-2xl text-lg italic mt-[-70px]">
            "Real coffee flavor, extracted from 100% natural beans."
          </p>
          <button className="mt-8 px-8 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-lg">
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="bg-pink-50 py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">All menus in the store</h2>
        <p className="text-center text-gray-600 mb-12">Choose from our wide variety of drinks and snacks.</p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <CupSoda size={50} />, label: "Drinks", count: "30 Courses" },
            { icon: <Popcorn size={50} />, label: "Snacks", count: "50 Courses" },
            { icon: <Coffee size={50} />, label: "Coffee", count: "15 Courses" },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl">{cat.label}</h3>
              <p className="text-gray-500">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIAL MENU SECTION (ជាមួយ Effect ពេលប៉ះ) */}
      <div className="bg-[#FDE7D9] py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Special menu for restaurants</h2>
          <p className="text-gray-600">The most popular menu chosen by our guests.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className="relative h-[450px] overflow-hidden rounded-2xl group cursor-pointer shadow-xl"
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            >
              {/* រូបភាព */}
              <img 
                src={item.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.title}
              />

              {/* Overlay បង្ហាញព័ត៌មានពេល Hover */}
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                <p className="text-center text-sm mb-4 text-gray-300">{item.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex items-center text-yellow-400">
                      <Star size={18} fill="currentColor" />
                      <span className="ml-1 text-white">{item.rating}</span>
                   </div>
                   <span className="text-2xl font-bold text-amber-500">{item.price}</span>
                </div>
                
                <button className="bg-amber-700 px-8 py-2 rounded-full hover:bg-amber-800 transition-all active:scale-95">
                  Buy Now
                </button>
              </div>

              {/* ចំណងជើងខាងក្រោម (បាត់ពេល Hover) */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent py-6 text-center group-hover:opacity-0 transition-opacity">
                <span className="text-white text-xl font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SWIPER SECTION */}
      <div className="max-w-6xl mx-auto py-20 ">
        <div className="mt-20 mb-20 text-center">
         <h2 className="text-4xl font-bold text-gray-800">Coffee Beans</h2>
          <p className="text-gray-600">The most popular type of coffee beans in the store.</p>
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
          className="mySwiper"
        >
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
  className="mySwiper px-10"
>
  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500&auto=format&fit=crop" 
      title="Coffee beans" 
      price="$5.00" 
      likes="40" 
    />
  </SwiperSlide>

  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1599639932525-213272ff954b?q=80&w=788&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$10.00" 
      likes="50" 
    />
  </SwiperSlide>

  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1598483604448-fa50403fcd25?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$8.50" 
      likes="100" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1661668998444-7470e87e468c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$20.00" 
      likes="1k" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1605711599412-775918dbe770?q=80&w=651&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$15.00" 
      likes="49" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1583441012461-abcc0bd2400d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$8.20" 
      likes="400" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://images.unsplash.com/photo-1658980356502-86abf6d5d5a8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Coffee beans" 
      price="$19.00" 
      likes="70" 
    />
  </SwiperSlide>
</Swiper>
        </Swiper>
      </div>
      {/* SWIPER SECTION coffee */}
      <div className="max-w-6xl mx-auto py-20">
        <div className="mt-20 mb-20 text-center">
         <h2 className="text-4xl font-bold text-gray-800">Drinks Menu</h2>
          <p className="text-gray-600">It is the most popular type of soft drink in the store.</p>
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
          className="mySwiper"
        >
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
  className="mySwiper px-10"
>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg" 
      title="Coffee latte" 
      price="$5.00" 
      likes="40" 
    />
  </SwiperSlide>

  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg" 
      title="Cappuccino" 
      price="$10.00" 
      likes="100" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/bd/c4/4b/bdc44b6700ece11ff713ee133803f371.jpg" 
      title="Caramel Ice Cream Coffee" 
      price="$10.00" 
      likes="50" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/81/de/70/81de70fd36f7dfad4e2fb71642863924.jpg" 
      title="Coffee Milkshake" 
      price="$12.00" 
      likes="200" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/bc/ff/c0/bcffc047d62ea4b955da5695799737a8.jpg" 
      title="Chocolate milkshake" 
      price="$8.00" 
      likes="990" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/d3/32/d9/d332d9179ff7c342b1afda7b68502a36.jpg" 
      title="Healthy Blueberry Smoothie" 
      price="$10.00" 
      likes="500" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/4c/28/e2/4c28e2420bf38c50120dba0cbaf42e8d.jpg" 
      title="Espresso Coffee" 
      price="$8.00" 
      likes="550" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/56/27/50/562750b2c8e0b7e680d90a97f0e56b4b.jpg" 
      title="Americano Coffee" 
      price="$5.00" 
      likes="50k" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/54/4c/05/544c05e2212a31de1158907f6f0fac0e.jpg" 
      title="Italian coffee" 
      price="$9.30" 
      likes="560" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/474x/57/30/51/5730512538c6c2c357d239c7a55c3e45.jpg" 
      title="Hot coffee weather" 
      price="$10.30" 
      likes="500" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg" 
      title="Hot matcha" 
      price="$10.90" 
      likes="50" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/e2/c0/91/e2c09146cb0ea1c44b205bb4a004ca84.jpg" 
      title="Matcha Latte Recipe " 
      price="$10.00" 
      likes="200" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/8f/dd/37/8fdd373d0627c75c51eabe85d6991f0d.jpg" 
      title="Epic Chocolate Peanut" 
      price="$7.00" 
      likes="50" 
    />
  </SwiperSlide>

  
</Swiper>
        </Swiper>
      </div>
      {/* SWIPER SECTION coffee */}
      <div className="max-w-6xl mx-auto py-20">
        <div className="mt-20 mb-20 text-center">
         <h2 className="text-4xl font-bold text-gray-800">Snacks Menu</h2>
          <p className="text-gray-600">It is the most popular snack type in the store.</p>
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
          className="mySwiper"
        >
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
  className="mySwiper px-10"
>
 
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/2d/4b/f6/2d4bf6cd6d4e5b7667b799de6615a837.jpg" 
      title="Crispy Samosa Pinwheels" 
      price="$3.00" 
      likes="505" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/1c/c1/df/1cc1df0fcce77849fadcd01c7bb8d5da.jpg" 
      title="Palm cake" 
      price="$2.80" 
      likes="300" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/95/0a/0a/950a0a62dcebd0b0d9721751c7367d0e.jpg" 
      title="Vanilla Cupcakes" 
      price="$2.00" 
      likes="150" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/6e/63/e1/6e63e10e08856db51071176b74c1b74b.jpg" 
      title="Delicious Cruffins" 
      price="$5.00" 
      likes="350" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/1200x/3b/01/22/3b012248c9c07cec0e55f50e7e70a88a.jpg" 
      title="brunch" 
      price="$9.00" 
      likes="150" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/c6/57/44/c6574478d3aade47b488516626ae5b53.jpg" 
      title="Japanese fluffy pancakes " 
      price="$1.90" 
      likes="450" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/a5/28/64/a52864acd60be934593adb7a88505ff6.jpg" 
      title="Fluffy Strawberry Nutella Pancakes" 
      price="$10.00" 
      likes="560" 
    />
  </SwiperSlide>
  <SwiperSlide>
    <ProductSlide 
      image="https://i.pinimg.com/736x/9b/fe/d4/9bfed48fc5c70bd52b98cfc5c72b22f9.jpg" 
      title="Cake" 
      price="$4.50" 
      likes="502" 
    />
  </SwiperSlide>


  
</Swiper>
        </Swiper>
      </div>
      {/* -----FeaturedPage */}
      <div className="mt-10 mb-10">
        <FeaturedPage />
      </div>

    </div>
  );
};

export default Home;