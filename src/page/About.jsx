// src/pages/About.jsx
import React, { useEffect } from "react";
import Timeline from "../components/Timeline";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Eye,
  Target,
  Heart,
  ShieldCheck,
  UserRound,
  Globe,
  Leaf,
  HandHeart,
  Handshake,
  Coffee,
  CupSoda,
  Bean,
  Store,
  Award,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";

function About() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  // Data for values section
  const values = [
    {
      icon: <Leaf className="text-green-600" size={35} />,
      title: "Sustainability",
      description: "We source 100% ethically grown beans and use eco-friendly packaging to minimize our environmental impact.",
      color: "green",
    },
    {
      icon: <HandHeart className="text-red-600" size={35} />,
      title: "Our Mission",
      description: "Every cup is crafted with precision using freshly roasted beans and artisanal brewing techniques.",
      color: "red",
    },
    {
      icon: <Handshake className="text-blue-600" size={35} />,
      title: "Community Focus",
      description: "We support local farmers and regularly host community events in our space.",
      color: "blue",
    },
  ];

  // Data for coffee process
  const coffeeProcess = [
    {
      icon: <Coffee size={40} />,
      title: "Love for Coffee",
      description: "Every cup is brewed with passion and care to deliver the perfect aroma and taste.",
    },
    {
      icon: <CupSoda size={40} />,
      title: "Customer First",
      description: "We focus on friendly service and creating a cozy space for every customer who walks in.",
    },
    {
      icon: <Bean size={40} />,
      title: "Premium Quality Beans",
      description: "We carefully select high-quality beans from trusted farmers to ensure rich flavor in every sip.",
    },
    {
      icon: <Store size={40} />,
      title: "Community & Culture",
      description: "Our café brings people together, supporting local culture and creating memorable moments.",
    },
  ];

  // Data for achievements
  const achievements = [
    {
      icon: <Award size={30} />,
      number: "5+",
      label: "Years of Excellence",
    },
    {
      icon: <Users size={30} />,
      number: "10,000+",
      label: "Happy Customers",
    },
    {
      icon: <Coffee size={30} />,
      number: "50+",
      label: "Coffee Varieties",
    },
    {
      icon: <Clock size={30} />,
      number: "24/7",
      label: "Service",
    },
  ];

  return (
    <div className="mt-[-40px]">
      {/* Hero Section */}
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1665669278652-bc140608a24a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Our Coffee Story
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-gray-200 max-w-3xl text-xl italic mb-8"
          >
            "From bean to cup - A journey of passion, quality, and community since 2020."
          </p>
          
          {/* Achievements Stats */}
          <div 
            data-aos="fade-up"
            data-aos-delay="600"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
          >
            {achievements.map((item, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <div className="text-amber-400 mb-2">{item.icon}</div>
                <div className="text-2xl font-bold text-white">{item.number}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>

          <button 
            data-aos="zoom-in"
            data-aos-delay="800"
            className="mt-10 px-10 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 transition-all transform hover:scale-105 shadow-2xl"
          >
            Discover Our Story
          </button>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="p-8 bg-[#C9B59C] mb-3 w-full m-auto shadow-lg">
        <h1
          data-aos="fade-right"
          className="text-4xl md:text-5xl font-bold text-center mb-5"
        >
          Our <span className="text-[#a65b3c]">Mission & Values</span>
        </h1>
        <p 
          data-aos="fade-left"
          className="text-center text-gray-700 max-w-2xl mx-auto mb-12 text-lg"
        >
          We're committed to excellence in every cup while making a positive impact on our community and environment.
        </p>

        {/* Values Boxes */}
        <div className="flex flex-col md:flex-row justify-between gap-8 p-4 md:p-8 bg-[#C9B59C]">
          {values.map((value, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
              className="bg-[#D9CFC7] p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full md:w-[30%]"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {value.icon}
              </div>
              <h2 className="text-3xl font-bold mt-3 mb-5 text-center">{value.title}</h2>
              <p className="text-lg text-center text-gray-700">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="mt-20 mb-20">
          <h1
            data-aos="fade-right"
            className="text-center font-bold text-4xl md:text-5xl uppercase"
          >
            Our <span className="text-[#ba582e]">Journey</span>
          </h1>
          <p 
            data-aos="fade-left"
            className="text-center text-gray-700 max-w-2xl mx-auto mt-4 text-lg"
          >
            From a small dream to your favorite coffee spot - here's our story
          </p>
        </div>

        {/* Timeline Component */}
        <div className="min-h-screen bg-[#C9B59C] flex items-center justify-center py-10">
          <Timeline />
        </div>

        {/* Coffee Process Section */}
        <div className="bg-gradient-to-r from-[#b6562e] to-[#8b3e1f] w-full rounded-2xl mt-10 pb-10">
          <h1 
            data-aos="fade-up"
            className="text-center font-bold text-4xl md:text-5xl uppercase text-white pt-16 pb-8"
          >
            Our Coffee Process
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center text-amber-200 max-w-2xl mx-auto px-4 mb-12 text-lg"
          >
            Every step is carefully crafted to bring you the perfect cup of coffee
          </p>

          <div className="w-[95%] mx-auto pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coffeeProcess.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="text-center bg-[#AF8260] rounded-2xl p-6 hover:shadow-2xl shadow-lg transform hover:scale-105 transition-all duration-500"
                >
                  <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div 
          data-aos="zoom-in"
          className="bg-white rounded-2xl p-12 mt-10 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#a65b3c] mb-4">
            Visit Us Today!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            Come experience our passion for coffee and be part of our growing community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#a65b3c] text-white rounded-full font-semibold hover:bg-[#8b3e1f] transition-all duration-300 transform hover:scale-105">
              Find Our Location
            </button>
            <button className="px-8 py-3 border-2 border-[#a65b3c] text-[#a65b3c] rounded-full font-semibold hover:bg-[#a65b3c] hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;