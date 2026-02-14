import React from 'react'

const ProductSlide = ({ image, title, price, likes }) => {
  return (
    <div className="relative h-[450px] w-full rounded-3xl overflow-hidden group shadow-lg cursor-pointer">
      {/* ១. រូបភាពផ្ទៃខាងក្រោយ */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />

      {/* ២. Badge Like នៅខាងលើឆ្វេង */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md flex items-center gap-2 shadow-sm">
        <span className="text-black">👍</span>
        <span className="font-bold text-gray-800">{likes}</span>
      </div>

      {/* ៣. ផ្ទាំងព័ត៌មានខាងក្រោម (Overlay) */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-3xl font-bold mb-6 text-center">{title}</h3>
        
        <div className="flex justify-between items-center mb-2">
          {/* ប៊ូតុងតម្លៃ */}
          <button className="border-2 border-white text-white px-5 py-1 rounded-2xl font-bold hover:bg-white hover:text-black transition">
            {price}
          </button>
          
          {/* ប៊ូតុង Buy New */}
          <button className="bg-transparent border-2 border-[#A66043] text-[#A66043] px-5 py-1 rounded-xl font-bold hover:bg-[#A66043] hover:text-white transition">
            Buy New
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlide