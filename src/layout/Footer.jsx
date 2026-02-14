import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  CirclePlay // ប្រើជំនួស TikTok icon ឬប្រើ SVG ផ្ទាល់ខ្លួន
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full py-12 px-6 bg-cover bg-center text-white" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
      
      {/* ស្រទាប់ខ្មៅពីលើរូបភាពដើម្បីឱ្យអក្សរច្បាស់ (Overlay) */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* ផ្នែកទី ១: ឈ្មោះហាង និងការពិពណ៌នា */}
          <div className="space-y-4">
             {/* LOGO */}
        <img
          src="https://i.pinimg.com/736x/ec/aa/6a/ecaa6ac4cbb715c055bd586316117d00.jpg"
          className="border border-gray-400 w-16 h-16 rounded-full"
          alt="Logo"
        />
            <h2 className="text-2xl font-bold uppercase tracking-wider">Coffee Time</h2>
            <p className="text-gray-300 leading-relaxed max-w-xs">
              Crafting the perfect cup of coffee daily. We bring the world's best beans to your neighborhood.
            </p>
          </div>

          {/* ផ្នែកទី ២: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3 font-semibold">
            <a href="#" className="hover:text-amber-500 transition">Home</a>
            <a href="#" className="hover:text-amber-500 transition">About</a>
            <a href="#" className="hover:text-amber-500 transition">Service</a>
            <a href="#" className="hover:text-amber-500 transition">Contact</a>
            <a href="#" className="hover:text-amber-500 transition">Info</a>
          </div>

          {/* ផ្នែកទី ៣: ព័ត៌មានទំនាក់ទំនង */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm"><Mail size={16} className="text-black" /></div>
              <span className="text-sm">hello@yourcoffeeshop.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm"><Phone size={16} className="text-black" /></div>
              <span className="text-sm">092345678909</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm"><MapPin size={16} className="text-black" /></div>
              <span className="text-sm">St. 123, Phnom Penh, Cambodia</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm"><Clock size={16} className="text-black" /></div>
              <span className="text-sm">Mon-Sun: 7:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* បន្ទាត់ខណ្ឌ និង Social Icons */}
        <div className="border-t border-white/50 pt-8 flex justify-center gap-6">
          <SocialIcon icon={<Facebook size={20} />} />
          <SocialIcon icon={<Instagram size={20} />} />
          <SocialIcon icon={<CirclePlay size={20} />} /> {/* តំណាងឱ្យ TikTok */}
          <SocialIcon icon={<Twitter size={20} />} />
          <SocialIcon icon={<Linkedin size={20} />} />
          <SocialIcon icon={<Mail size={20} />} />
          
        </div>
      </div>
    </footer>
  );
};

// Component តូចសម្រាប់ Social Icon មូលៗពណ៌ស
const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-amber-500 hover:text-white transition-all">
    {icon}
  </a>
);

export default Footer;