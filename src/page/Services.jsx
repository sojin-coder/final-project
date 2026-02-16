import React, { useEffect } from "react";
import {
  Coffee,
  Zap,
  IceCreamCone,
  Clock,
  Award,
  Users,
  Heart,
  CupSoda,
  Menu,
  Timer,
  Leaf,
  ChefHat,
  Sparkles,
  Star,
  Gift,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Data for different sections
  const featuredBrews = [
    {
      icon: <Coffee size={50} />,
      label: "Latte",
      description: "A smooth embrace of rich espresso and velvety steamed milk.",
      price: "$3.99",
      popular: true,
    },
    {
      icon: <Zap size={50} />,
      label: "Espresso",
      description: "Bold, intense, and pure. The heart of every great coffee.",
      price: "$2.99",
      popular: false,
    },
    {
      icon: <IceCreamCone size={50} />,
      label: "Cold Brew",
      description: "Slow-steeped for 12 hours for a smoother, crisp finish.",
      price: "$4.99",
      popular: true,
    },
  ];

  const allMenuItems = [
    {
      category: "Hot Coffee",
      items: [
        { name: "Americano", price: "$2.99", description: "Espresso with hot water" },
        { name: "Cappuccino", price: "$3.99", description: "Espresso with foamy milk" },
        { name: "Mocha", price: "$4.49", description: "Espresso with chocolate" },
        { name: "Macchiato", price: "$3.49", description: "Espresso with milk foam" },
      ]
    },
    {
      category: "Cold Drinks",
      items: [
        { name: "Iced Latte", price: "$4.29", description: "Chilled latte with ice" },
        { name: "Frappuccino", price: "$5.49", description: "Blended coffee drink" },
        { name: "Iced Matcha", price: "$4.99", description: "Green tea with milk" },
        { name: "Thai Tea", price: "$3.99", description: "Traditional Thai iced tea" },
      ]
    },
    {
      category: "Pastries",
      items: [
        { name: "Croissant", price: "$2.49", description: "Buttery, flaky pastry" },
        { name: "Muffin", price: "$2.99", description: "Blueberry or chocolate" },
        { name: "Cheesecake", price: "$4.99", description: "New York style" },
        { name: "Cookie", price: "$1.99", description: "Chocolate chip" },
      ]
    }
  ];

  const specialOffers = [
    {
      icon: <Gift size={30} />,
      title: "Happy Hour",
      description: "20% off all drinks from 3PM - 5PM",
    },
    {
      icon: <Users size={30} />,
      title: "Group Discount",
      description: "10% off for groups of 4 or more",
    },
    {
      icon: <Heart size={30} />,
      title: "Loyalty Program",
      description: "Buy 9 coffees, get 1 free",
    },
    {
      icon: <Coffee size={30} />,
      title: "Coffee Tasting",
      description: "Free tasting every Saturday",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Leaf size={40} />,
      title: "100% Organic Beans",
      description: "Sourced from sustainable farms",
    },
    {
      icon: <ChefHat size={40} />,
      title: "Expert Baristas",
      description: "Trained in Italy",
    },
    {
      icon: <Timer size={40} />,
      title: "Fast Service",
      description: "Under 5 minutes",
    },
    {
      icon: <Sparkles size={40} />,
      title: "Fresh Daily",
      description: "Roasted every morning",
    },
  ];

  return (
    <div className="mt-[35px] mb-20">
      {/* Hero Section */}
      <div
        data-aos="fade-down"
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1665669278652-bc140608a24a?q=80&w=871&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 
            data-aos="fade-up"
            className="text-white text-5xl md:text-7xl font-bold mb-6"
          >
            Experience the Art of Coffee
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-200 max-w-3xl text-xl italic mb-8"
          >
            "Premium beans, roasted with passion, brewed with love for our community since 2020."
          </p>
          
          {/* Stats */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">50+</div>
              <div className="text-white text-sm">Coffee Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">10K+</div>
              <div className="text-white text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">4.9</div>
              <div className="text-white text-sm">Customer Rating</div>
            </div>
          </div>

          <button 
            data-aos="zoom-in"
            data-aos-delay="600"
            className="mt-10 px-10 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 transition-all transform hover:scale-105 shadow-2xl"
          >
            View Full Menu
          </button>
        </div>
      </div>

      {/* Why Choose Us Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Why Choose Us
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-500 text-center max-w-2xl mx-auto mb-16"
          >
            We're committed to providing the best coffee experience in town
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brews */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Our Featured Brews
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-500 text-center max-w-2xl mx-auto mb-16"
          >
            Discover our most loved coffee selections, crafted to perfection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrews.map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative"
              >
                {item.popular && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                    Popular 🔥
                  </span>
                )}
                <div className="w-24 h-24 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl text-center mb-2">{item.label}</h3>
                <p className="text-gray-500 text-center mb-4">{item.description}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-2xl font-bold text-amber-700">{item.price}</span>
                  <button className="px-4 py-2 bg-amber-700 text-white rounded-full text-sm hover:bg-amber-800 transition">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Menu Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Our Full Menu
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-500 text-center max-w-2xl mx-auto mb-16"
          >
            Explore our wide selection of coffee, drinks, and pastries
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allMenuItems.map((category, catIdx) => (
              <div
                key={catIdx}
                data-aos="fade-up"
                data-aos-delay={catIdx * 150}
                className="bg-gray-50 p-6 rounded-3xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-amber-700">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className="font-bold text-amber-700">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section - NEW */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Special Offers
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-600 text-center max-w-2xl mx-auto mb-16"
          >
            Don't miss out on our amazing deals and promotions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {specialOffers.map((offer, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 100}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {offer.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                <p className="text-gray-500 text-sm">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-amber-700 text-center mb-4"
          >
            What Our Customers Say
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-500 text-center max-w-2xl mx-auto mb-16"
          >
            Join thousands of satisfied coffee lovers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sophal Dara",
                comment: "The best Latte in town! The atmosphere is so peaceful and the staff is friendly.",
                rating: 5,
              },
              {
                name: "Srey Pich",
                comment: "Cold Brew is my daily energy booster. Highly recommended!",
                rating: 5,
              },
              {
                name: "Vannak Sothea",
                comment: "Great place to work. Good wifi and amazing coffee.",
                rating: 4,
              },
              {
                name: "Chenda Rithy",
                comment: "The pastries are fresh and delicious. Love the croissants!",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="bg-gray-50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-bold text-amber-700">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div 
        data-aos="zoom-in"
        className="bg-gradient-to-r from-amber-700 to-amber-900 p-16 mt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Join Our Coffee Club
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-amber-200 text-lg mb-8"
          >
            Subscribe to get 10% off your first cup and exclusive offers!
          </p>
          
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button className="px-8 py-4 bg-white text-amber-700 rounded-full font-bold hover:bg-amber-100 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-white">
            <div className="flex items-center justify-center gap-2">
              <Phone size={20} />
              <span>(855) 12-345-678</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail size={20} />
              <span>hello@coffeeco.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={20} />
              <span>Phnom Penh, Cambodia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;