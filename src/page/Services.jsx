import React from "react";
import {
  ChevronsLeftRight,
  Star,
  Coffee,
  Zap,
  IceCreamCone,
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  return (
    <div className="mt-10 mb-20">
      <div
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1665669278652-bc140608a24a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-4xl md:text-7xl font-bold tracking-tighter">
            Experience the Art of Coffee
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg italic mt-4">
            "Premium beans, roasted with passion, brewed for you."
          </p>
          <button className="mt-8 px-8 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-lg">
            Explore Menu
          </button>
        </div>
      </div>
      <div className="mt-10 bg-gray-200">
        {/* CATEGORY SECTION */}
        <div className=" py-16 px-4">
                                                                                                        
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Our Featured Brews
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coffee size={50} />,
                label: "Latte",
                count:
                  "A smooth embrace of rich espresso and velvety steamed milk.",
              },
              {
                icon: <Zap size={50} />,
                label: "Espresso",
                count:
                  "Bold, intense, and pure. The heart of every great coffee.",
              },
              {
                icon: <IceCreamCone size={50} />,
                label: "Cold Brew",
                count:
                  "Slow-steeped for 12 hours for a smoother, crisp finish.",
              },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition-transform  shadow-gray-500 cursor-pointer"
              >
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xl">{cat.label}</h3>
                <p className="text-gray-500">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-700 text-center mb-20">
          What Our Customers Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col bg-gray-200 p-6 border-l-8 border-orange-700 shadow-sm max-w-full h-[90px]">
            <p className="text-lg text-center pb-2">
              "The best Latte in town! The atmosphere is so peaceful."
            </p>
            <p className="text-xl text-center text-gray-500">- Sophal Dara</p>
          </div>
          <div className="flex flex-col bg-gray-200 p-6 border-l-8 border-orange-700 shadow-sm max-w-full h-[90px]">
            <p className="text-lg text-center pb-2">
              "Cold Brew is my daily energy booster. Highly recommended!"
            </p>
            <p className="text-xl text-center text-gray-500">- Srey Pich</p>
          </div>
        </div>
        <div className="mt-30 ">
          <div className="bg-gray-300 p-10">
            <h1 className="font-medium text-5xl text-amber-600 p-5 text-center mt-10">
              Join Our Coffee Club
            </h1>
            <p className="text-lg text-center text-gray-500">
              Subscribe to get 10% off your first cup!
            </p>
            <div className="mt-5​​ pb-10 pt-10 flex justify-center items-center">
              <input
                type="text"
                placeholder="Enter..."
                className="border-2 w-[300px] h-[50px] px-2"
              />
              <button className="w-[100px] h-[50px] bg-amber-600 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
