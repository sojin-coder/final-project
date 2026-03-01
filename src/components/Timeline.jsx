import React, { useEffect } from "react";
import { Check, Coffee, Gift, Users, Store } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const timelineData = [
  {
    year: "2015",
    title: "First Branch Opening",
    desc: "Started our coffee business in Phnom Penh capital",
    icon: <Store size={18} />
  },
  {
    year: "2017",
    title: "Branch Expansion",
    desc: "Opened 3 more branches across the city",
    icon: <Coffee size={18} />
  },
  {
    year: "2019",
    title: "10,000 Customers",
    desc: "Reached the milestone of serving 10,000 happy customers",
    icon: <Users size={18} />
  },
  {
    year: "2022",
    title: "Best Coffee Award",
    desc: "Received the Best Coffee of the Year award",
    icon: <Gift size={18} />
  },
  {
    year: "2024",
    title: "10 Branches Nationwide",
    desc: "Expanded our business to provinces across Cambodia",
    icon: <Coffee size={18} />
  }
];

const Timeline = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="relative w-[90%] max-w-6xl mx-auto py-16">
      {/* Background coffee pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl">☕</div>
        <div className="absolute bottom-10 right-10 text-9xl">☕</div>
      </div>

      {/* Center line */}
      <div 
        className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-amber-700"
        data-aos="fade-down"
        data-aos-duration="1500"
      ></div>

      <div className="space-y-20 relative">
        {timelineData.map((item, index) => (
          <div key={index} className="relative flex items-center">
            {/* Card with coffee shop style */}
            <div
              className={`w-5/12 rounded-xl bg-amber-50 p-6 shadow-lg border border-amber-200
              ${index % 2 === 0 ? "ml-auto text-left" : "mr-auto text-left"}
              hover:shadow-2xl transition-shadow duration-300`}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              data-aos-delay={index * 200}
              data-aos-duration="1000"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">☕</span>
                <h2 className="text-xl font-bold text-amber-800">
                  {item.year}
                </h2>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-amber-900">
                {item.title}
              </h3>
              <p className="mt-2 text-amber-700">
                {item.desc}
              </p>
            
            </div>

            {/* Icon with coffee theme */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full 
                ${index % 2 === 0 ? 'bg-amber-700' : 'bg-amber-800'} 
                text-white shadow-lg border-2 border-amber-300
                hover:scale-110 transition-transform duration-300`}
              data-aos="zoom-in"
              data-aos-delay={index * 200 + 100}
              data-aos-duration="800"
            >
              {item.icon}
            </div>

            {/* Year label for mobile/alternate view */}
            <div 
              className={`absolute top-0 ${index % 2 === 0 ? 'left-[60%]' : 'right-[60%]'} 
                hidden lg:block text-amber-600 font-bold text-sm bg-amber-100 px-3 py-1 rounded-full`}
              data-aos="fade-up"
              data-aos-delay={index * 200 + 150}
            >
              {item.year}
            </div>
          </div>
        ))}
      </div>

    
      
    </div>
  );
};

export default Timeline;