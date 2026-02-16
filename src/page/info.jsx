import React, { useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  GraduationCap,
  CirclePlay,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Assets
import jing from "../assets/image/jing.jpg";
import sophoeus from "../assets/image/sophoeus.jpg";
import rak from "../assets/image/rak.jpg";

// Team Data
const teamMembers = [
  {
    id: 1,
    image: jing,
    name: "Loem Meyching",
    role: "Frontend Developer and UI/UX Design Student",
    description:
      "Passionate about building modern and responsive websites using HTML, CSS, and JavaScript. Currently improving UI/UX skills through real projects.",
  },
  {
    id: 2,
    image: sophoeus,
    name: "LACH SOPHOEUS",
    role: "Frontend Developer Student",
    description:
      "Learning frontend technologies. Loves solving problems and creating dynamic web applications.",
  },
  {
    id: 3,
    image: rak,
    name: "Khut Raksa",
    role: "Frontend Developer and UI/UX Design Student",
    description:
      "Passionate about building modern and responsive websites using HTML, CSS, and JavaScript. Currently improving UI/UX skills through real projects.",
  },
];

const info = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased mt-[-40px]">
      {/* 1. HERO SECTION */}
      <section
        data-aos="fade-down"
        data-aos-duration="1500"
        className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white text-5xl md:text-8xl font-bold tracking-tighter mb-6"
          >
            Our Coffee Story
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-gray-200 text-lg md:text-2xl italic font-light mb-10 leading-relaxed"
          >
            "From bean to cup - A journey of passion, quality, and community
            since 2020."
          </p>
          <button 
            data-aos="zoom-in"
            data-aos-delay="600"
            className="px-10 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 transition-all transform hover:scale-105 shadow-2xl"
          >
            Explore Menu
          </button>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          {/* Content Left */}
          <div 
            data-aos="fade-right"
            data-aos-duration="1200"
            className="flex-1 text-left"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#A65D39] mb-8">
              Brewing Excellence <br /> Since 2020
            </h2>
            <div className="text-gray-600 space-y-6 text-lg leading-relaxed">
              <p data-aos="fade-up" data-aos-delay="200">
                Founded in the heart of Phnom Penh, Coffee Co. began as a simple
                dream: to bring world-class coffee to our community while
                supporting sustainable farming practices.
              </p>
              <p data-aos="fade-up" data-aos-delay="400">
                What started as a small kiosk has grown into a beloved gathering
                place for coffee enthusiasts and professionals alike.
              </p>
              <p data-aos="fade-up" data-aos-delay="600">
                Today, we're more than just a coffee shop - we're a community
                hub where connections are made over the perfect cup.
              </p>
            </div>
            <button 
              data-aos="fade-up"
              data-aos-delay="800"
              className="mt-10 px-10 py-4 border-2 border-[#A65D39] text-[#A65D39] rounded-full font-bold hover:bg-[#A65D39] hover:text-white transition-all duration-300"
            >
              Meet Our Team
            </button>
          </div>

          {/* Image Right */}
          <div 
            data-aos="fade-left"
            data-aos-duration="1200"
            className="flex-1 relative"
          >
            <div className="absolute -inset-4 bg-amber-100/50 rounded-[3rem] -z-10 transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=387&auto=format&fit=crop"
              className="rounded-[2.5rem] w-full h-[550px] object-cover shadow-2xl transition-transform duration-700 hover:rotate-0"
              alt="Premium Coffee"
            />
          </div>
        </div>
      </section>

      {/* 3. TEAM SECTION */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 
            data-aos="fade-up"
            className="text-5xl font-black text-gray-900 mb-6"
          >
            Meet Our Team
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-500 max-w-2xl mx-auto mb-20 text-lg"
          >
            Our passionate team of coffee experts is dedicated to creating
            exceptional experiences for every customer.
          </p>

          {/* Teacher Card */}
          <div 
            data-aos="flip-left"
            data-aos-duration="1200"
            className="w-full max-w-[500px] mx-auto mb-10 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group"
          >
            {/* Profile Image */}
            <div className="relative w-48 h-48 mx-auto mb-10">
              <div className="absolute inset-0 bg-amber-200 rounded-full scale-0 group-hover:scale-105 transition-transform duration-500 opacity-20"></div>
              <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden ring-8 ring-gray-50 relative z-10">
                <img
                  src="https://etec-elearning.vercel.app/assets/dev-darith-DghgE6Pg.jpg"
                  alt="Teacher"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tight">
              Ven ChanDarith
            </h3>

            {/* Teacher Badge */}
            <span className="inline-block bg-amber-100 text-[#A65D39] text-xs font-bold px-4 py-1 rounded-full mb-4">
              Instructor
            </span>

            <p className="text-[#A65D39] font-black text-xs uppercase tracking-[0.3em] mb-6">
              Web Development Teacher
            </p>

            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Passionate instructor with strong experience in Web Development,
              dedicated to helping students build real-world projects and
              succeed in tech careers.
            </p>

            {/* Socials */}
            <div className="flex justify-center gap-5">
              {[
                { icon: <Facebook size={20} />, link: "#" },
                { icon: <Linkedin size={20} />, link: "#" },
                { icon: <Instagram size={20} />, link: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#A65D39] hover:text-white hover:rotate-[360deg] transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group"
              >
                {/* Profile Image */}
                <div className="relative w-48 h-48 mx-auto mb-10">
                  <div className="absolute inset-0 bg-amber-200 rounded-full scale-0 group-hover:scale-105 transition-transform duration-500 opacity-20"></div>
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden ring-8 ring-gray-50 relative z-10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[#A65D39] font-black text-xs uppercase tracking-[0.3em] mb-6">
                  {member.role}
                </p>
                <p className="text-gray-500 text-base leading-relaxed mb-10">
                  {member.description}
                </p>

                {/* Socials */}
                <div className="flex justify-center gap-5">
                  {[
                    { icon: <Facebook size={20} />, link: "#" },
                    { icon: <Linkedin size={20} />, link: "#" },
                    { icon: <Instagram size={20} />, link: "#" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#A65D39] hover:text-white hover:rotate-[360deg] transition-all duration-500 shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default info;