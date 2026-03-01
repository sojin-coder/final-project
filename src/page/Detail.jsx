import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Coffee } from 'lucide-react';

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!state || !state.product) {
    return <div className="h-screen flex items-center justify-center">Product not found!</div>;
  }

  const { product } = state;

  const handleOrder = () => {
    navigate('/pay', { state: { product, quantity } });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto p-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-amber-700 font-semibold mb-6">
          <ChevronLeft size={24} /> Back to Home
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-12">
          
          {/* ផ្នែករូបភាព */}
          <div className="relative group">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-[400px] md:h-[550px] object-cover rounded-[30px] shadow-lg transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute top-6 right-6 bg-white/90 px-4 py-2 rounded-2xl shadow-md font-bold text-amber-700 flex items-center gap-2">
              <Star size={20} fill="currentColor" /> {product.likes} Likes
            </div>
          </div>

          {/* ផ្នែកព័ត៌មាន */}
          <div className="flex flex-col justify-center">
            <span className="text-amber-700 font-bold tracking-widest uppercase mb-2">Premium Collection</span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">{product.title}</h1>
            
            <p className="text-gray-500 text-lg leading-relaxed mb-8 italic">
              "Experience the rich aroma and authentic taste of our premium {product.title}. Carefully selected and brewed to perfection for true coffee lovers."
            </p>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-5xl font-bold text-amber-800">{product.price}</span>
              <div className="h-10 w-[2px] bg-gray-200"></div>
              <div className="flex items-center border-2 border-gray-200 rounded-2xl p-2 gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl font-bold hover:bg-gray-200">-</button>
                <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl font-bold hover:bg-gray-200">+</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleOrder}
                className="flex items-center justify-center gap-3 bg-amber-700 text-white py-5 rounded-3xl font-bold text-xl hover:bg-amber-800 transition shadow-xl active:scale-95"
              >
                <ShoppingCart size={24} /> Order Now
              </button>
              <button className="flex items-center justify-center gap-3 border-2 border-gray-200 text-gray-700 py-5 rounded-3xl font-bold text-xl hover:bg-gray-50 transition">
                <Coffee size={24} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;