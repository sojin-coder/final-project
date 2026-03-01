import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductSlide = ({ image, title, price, likes }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    // បន្ថែម e.stopPropagation() ដើម្បីឱ្យ Swiper កុំចាប់យកការ Click នេះជាការអូស
    e.stopPropagation();

    const product = {
      image,
      title,
      price,
      likes,
      quantity: 1
    };
    
    navigate('/pay', { 
      state: { 
        product: product,
        from: 'product-slide'
      } 
    });
  };

  return (
    <div className="relative h-[450px] w-full rounded-3xl overflow-hidden group shadow-lg cursor-pointer">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md flex items-center gap-2 shadow-sm z-10">
        <span className="text-black">👍</span>
        <span className="font-bold text-gray-800">{likes}</span>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 z-20">
        <h3 className="text-white text-3xl font-bold mb-6 text-center">{title}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <div className="border-2 border-white text-white px-5 py-1 rounded-2xl font-bold">
            {price}
          </div>
          
          <button 
            onClick={handleBuyNow}
            className="bg-amber-700 border-2 border-amber-700 text-white px-5 py-1 rounded-xl font-bold hover:bg-amber-800 transition transform hover:scale-105 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

ProductSlide.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ProductSlide;