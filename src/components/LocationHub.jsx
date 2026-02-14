import React from 'react';
import { MapPin, Navigation, Maximize2, Layers, Cpu, Radio, Phone } from 'lucide-react';

export default function UpdatedLocationHub() {
  return (
    <div className="min-h-screen bg-[#0a0518] text-white p-4 md:p-10 font-mono">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-purple-400 to-purple-800 bg-clip-text text-transparent italic uppercase">
          Location Hub
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <MapPin size={18} />
            <span className="text-sm tracking-widest uppercase">Phnom Penh, Cambodia</span>
          </div>
          <a href="tel:+855962268884" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
            <Phone size={14} />
            <span className="text-sm tracking-widest font-bold">+855 96 226 8884</span>
          </a>
        </div>
      </div>

      {/* Map Interface Section */}
      <div className="max-w-6xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-[#1a1625] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Iframe Google Maps (បង្ហាញផែនទីពិតប្រាកដ) */}
          <div className="w-full h-[400px] md:h-[500px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3908.773822253457!2d104.8906!3d11.5622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109516007e0669b%3A0x647702f1a6035f8e!2sETEC%20Center!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh" 
              className="w-full h-full border-0 grayscale invert contrast-[1.2] opacity-70"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <span className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-md text-[10px] border border-cyan-500/30 font-bold uppercase">Phnom Penh</span>
                <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-md text-[10px] border border-green-500/30 font-bold uppercase">Online</span>
              </div>
              
              <a 
                href="https://goo.gl/maps/2YxdeCRiFRLZHQ5X8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 px-6 py-2 rounded-full flex items-center gap-2 text-xs font-black italic tracking-widest transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <Navigation size={14} /> NAVIGATE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Latitude" value="11.5622°N" />
        <StatCard label="Longitude" value="104.8905°E" />
        <StatCard label="Status" value="VERIFIED" />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6 group">
      <p className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
        <Radio size={12} /> {label}
      </p>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-full shadow-[0_0_10px_#22d3ee]"></div>
      </div>
    </div>
  );
}