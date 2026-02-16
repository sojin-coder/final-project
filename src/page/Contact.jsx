import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import LocationHub from "../components/LocationHub";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  PhoneCall,
  MapPinHouse,
  Coffee,
  CupSoda,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Coffee size={24} />,
    title: "Hotline",
    details: ["+855 883 278 109"],

    color:
      "bg-[linear-gradient(90deg,rgba(92,51,23,1)_20%,rgba(166,91,60,1)_80%)]",
  },
  {
    icon: <CupSoda size={24} />,
    title: "Order Online",
    details: ["GrabFood / FoodPanda"],
    color:
      "bg-[linear-gradient(90deg,rgba(140,82,45,1)_10%,rgba(92,51,23,1)_90%)]",
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Our Café",
    details: ["Street 271, Phnom Penh", "Near Central Market"],
    color:
      "bg-[linear-gradient(90deg,rgba(166,91,60,1)_10%,rgba(92,51,23,1)_90%)]",
  },
  {
    icon: <Clock size={24} />,
    title: "Opening Time",
    details: ["Everyday 7:00 AM – 9:00 PM"],
    color:
      "bg-[linear-gradient(90deg,rgba(210,140,90,1)_10%,rgba(140,82,45,1)_90%)]",
  },
];

const ContactPage = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l4eqtus", // Service ID របស់អ្នក
        "template_xc4pqv9", // 🟢 ប្តូរមកដាក់ ID ថ្មីនេះ
        formRef.current,
        "wU6Jn3ZB7dvgqh5Vv", // 🔴 កុំភ្លេចប្តូរយក Public Key មកដាក់ដែរ
      )
      .then(() => {
        alert("Message sent successfully ✅");
        formRef.current.reset();
      })
      .catch((error) => {
        alert("Failed ❌ " + error.text);
      });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="bg-gray-50 w-full min-h-screen pb-20 mx-auto mt-[-40px]">
      <div
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1665669278652-bc140608a24a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1
            className="text-white text-4xl md:text-7xl font-bold tracking-tighter"
            data-aos="zoom-in-down"
          >
            Experience the Art of Coffee
          </h1>
          <p
            className="text-gray-200 max-w-2xl text-lg italic mt-4"
            data-aos="zoom-in-left"
          >
            "Premium beans, roasted with passion, brewed for you."
          </p>
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mt-8 px-8 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-lg"
          >
            Explore Menu
          </button>
        </div>
      </div>
      <div className="bg-[#493628] w-full rounded-2xl shadow-2xl pt-1 mt-5 mx-auto">
        {/* HERO */}
        {/* CONTACT INFO */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20"
          data-aos="zoom-out-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {contactInfo.map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition"
              >
                <div
                  className={`${card.color} text-white p-3 rounded-xl mb-4 w-[50px]`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                {card.details.map((text, idx) => (
                  <p key={idx} className="text-gray-500 text-sm">
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="max-w-7xl mx-auto px-10 mt-10">
          <h1 className="text-3xl font-bold text-center my-10 text-white uppercase text-shadow-lg/30 "
             data-aos="fade-right"
             data-aos-offset="300"
             data-aos-easing="ease-in-sine"
          >
            Contact Information
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="bg-[#6F4E37] p-10 rounded-3xl shadow-xl text-white"
              data-aos="fade-right"
            >
              <h2 className="text-3xl font-bold mb-6">Our Details</h2>
              <hr size="1" className="my-4 bg-amber-50" />
              <p className="text-white font-bold">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
              {/* LOCATION */}
              <div className="bg-gray-50bg-[#fafafad0] w-[90%] h-auto my-2 p-5 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-sm">
                <MapPin size={24} className="text-white" />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">Location</h3>
                  <p className="text-sm text-gray-200">Phnom Penh, Cambodia</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="bg-gray-50bg-[#fafafad0] w-[90%] h-auto my-2 p-5 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-sm">
                <PhoneCall size={24} className="text-white" />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">Phone</h3>
                  <p className="text-sm text-gray-200">+855 883 278 109</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="bg-gray-50bg-[#fafafad0] w-[90%] h-auto my-2 p-5 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-sm ">
                <Mail size={24} className="text-white" />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <p className="text-sm text-gray-200">
                    lachsophoeurs@gmail.com
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="bg-gray-50bg-[#fafafad0] w-[90%] h-auto my-2 p-5 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-sm">
                <MapPinHouse size={24} className="text-white" />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">Address</h3>
                  <p className="text-sm text-gray-200">
                    Street 271, Phnom Penh
                  </p>
                </div>
              </div>
              {/* Business Hours */}
              <div className="bg-gray-50bg-[#fafafad0] w-[90%] h-auto my-2 p-5 rounded-lg shadow-lg  hover:shadow-sm">
                <h1 className="text-xl font-bold text-white text-center text-shadow-lg/30">
                  Business Hours
                </h1>
                <span className="mt-5 flex justify-between gap-1">
                  <p className="text-sm text-gray-200">Monday - Friday: </p>
                  <p className="text-sm text-gray-200">7:00 AM - 9:00 PM</p>
                </span>
                <hr size="1" className="my-5 bg-gray-50 " />
                <span className="mt-2 flex justify-between gap-1">
                  <p className="text-sm text-gray-200">Saturday: </p>
                  <p className="text-sm text-gray-200">8:00 AM - 10:00 PM</p>
                </span>
                <hr size="1" className="my-5 bg-gray-300" />
                <span className="mt-2 flex justify-between gap-1">
                  <p className="text-sm text-gray-200">Sunday: </p>
                  <p className="text-sm text-gray-200">8:00 AM - 8:00 PM</p>
                </span>
                <hr size="1" className="my-5 bg-gray-300 " />
                <span className="mt-2 flex justify-between gap-1">
                  <p className="text-sm text-gray-200">Public Holidays: </p>
                  <p className="text-sm text-gray-200">9:00 AM - 6:00 PM</p>
                </span>
              </div>
            </div>
            {/* Send Us a Message */}
            <div
              className="bg-[#e0dddc] p-8 md:p-10 rounded-3xl shadow-xl"
              data-aos="fade-left"
            >
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NAME */}
                  <div>
                    <label htmlFor="name" className="text-lg font-medium">
                      Name
                    </label>
                    <input
                      name="name"
                      placeholder="Full Name"
                      required
                      className="w-full h-10 px-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label htmlFor="email" className="text-lg font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full h-10 px-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="phone number"
                    className="w-full h-10 px-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />

                  {/* Subject */}
                  <div className="my-4">
                    <label className="block mb-1 text-lg font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full h-10 px-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="my-6">
                  <label className="block mb-1 text-lg font-medium">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-3 py-2 rounded bg-gray-100 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                  ></textarea>
                </div>

                {/* Subscribe */}
                <p className="text-center text-sm text-gray-700">
                  Subscribe to our newsletter for updates and promotions
                </p>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-300 bg-[#6F4E37] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-[95%] mx-auto mt-10" 
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0">
          <LocationHub />
        </div>
        <div className="  bg-gradient-to-r from-gray-800 to-gray-900 text-white w-[95%] mx-auto mt-20 ">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg sm:text-xl mb-6 opacity-90">
              Our support team is available 24/7 for urgent matters
            </p>
            <a
              href="tel:+15551234567"
              class="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Call Us Now
            </a>
          </div>
        </div>
        <div className="p-10"></div>
      </div>
    </div>
  );
};

export default ContactPage;
