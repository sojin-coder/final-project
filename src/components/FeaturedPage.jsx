import React from 'react';
import { ThumbsUp } from 'lucide-react';

const FeaturedPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12">
      
      {/* --- Section: Featured --- */}
      <div className="bg-[#FDE7D9] p-10 rounded-lg shadow-sm">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Featured</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 mb-10">
          {/* Item 1: Expresso */}
          <div className="flex-1 text-center px-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src="https://i.pinimg.com/736x/97/d1/24/97d12458afee25d5525270054d4fd9ac.jpg" alt="expresso" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">expresso</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Slow-steeped for 12 hours for a smoother, naturally sweet finish.</p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-40 bg-[#A66043]"></div>

          {/* Item 2: Latte */}
          <div className="flex-1 text-center px-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src="https://i.pinimg.com/1200x/c0/46/2a/c0462aba87c717ea044e5dccacf0f80d.jpg" alt="latte" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">latte</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Bold, intense, and pure. The heart of every great coffee.</p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-40 bg-[#A66043]"></div>

          {/* Item 3: Cold Brew */}
          <div className="flex-1 text-center px-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src="https://i.pinimg.com/1200x/18/da/2f/18da2fad7461d22ec47f3a8d7da6e7b3.jpg" alt="cold brew" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">cold brew</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A smooth embrace of rich espresso and velvety steamed milk.</p>
          </div>
        </div>
      </div>

      {/* --- Section: Why Choose Us & Opening Hours --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px] shadow-xl overflow-hidden rounded-xl">
        
        {/* Left: Why Choose Us */}
        <div className="bg-[#3D2517] text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us ? <span className="text-xs font-normal block opacity-70">Modern & Catchy</span></h2>
          <ul className="space-y-2 mb-8 text-lg">
            <li className="font-semibold">Premium Sourcing</li>
            <li className="font-semibold">Artisan Roasting</li>
          </ul>
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold w-fit hover:bg-gray-200 transition">
            Read more
          </button>
        </div>

        {/* Middle: Coffee Image */}
        <div className="relative h-full min-h-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop" 
            alt="Coffee Cup" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Opening Hours */}
        <div className="bg-[#F8B195] p-12 flex flex-col justify-center text-center">
          <h4 className="text-lg font-bold mb-2 uppercase">Opening hours</h4>
          <h2 className="text-4xl font-extrabold mb-6">7:00AM -9:00PM</h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            Our shop operates full-time, all week long. Customers can place orders through our website and also visit our branches in person.
          </p>
        </div>

      </div>

    </div>
  );
};

export default FeaturedPage;