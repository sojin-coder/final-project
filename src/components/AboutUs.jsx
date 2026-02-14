import React, { useState } from 'react';
import {  ChevronRight,Target,Plane,  } from "lucide-react";

const AboutUs = () => {
  // បង្កើត State សម្រាប់គ្រប់គ្រង Tab ដែលកំពុងចុច
  const [activeTab, setActiveTab] = useState('Team');

  // ទិន្នន័យសម្រាប់ Tab នីមួយៗ

  const contentData = {
    Mission: (
      <div className="text-center py-10">
        <h2 className="flex gap-2 items-center text-4xl font-bold  text-slate-800 mb-4"><Target size={40} color='blue'/> Our Mission</h2>
       <p className="text-xl md:text-lg text-gray-500 leading-relaxed font-light">
                   "To democratize education by providing accessible, affordable, and
                   high-quality learning experiences that empower individuals to
                   achieve their personal and professional goals."
      </p>
      </div>
    ),
    Vision: (
      <div className="text-center py-10">
        <h2 className="flex gap-2 items-center text-4xl  font-bold  text-slate-800 mb-4"> <Plane size={40} color='green' />Our Vision</h2>
        <p className="text-xl md:text-lg text-gray-500  leading-relaxed font-light">
                   "We aim to become the most trusted hub for digital talent, where anyone—regardless of background—can start from zero and become a world-class professional. Our vision is a future where quality technical education is a right, not a privilege."
      </p>
      </div>
    ),
    Story: (
      <div className="text-center py-10">
        <h2 className="text-4xl flex gap-2 items-center font-bold text-slate-800 mb-4"> Our Story</h2>
        <p className="text-xl md:text-lg text-gray-500  leading-relaxed font-light">
                   "Founded in 2017, ETEC Center emerged from a simple observation: the gap between university theory and industry practice was widening. We set out to bridge that gap by creating a center focused on <span className='font-bold'>practical, hands-on IT training. </span> 

Today, we stand as a premier institution for developers and tech enthusiasts in the region, led by industry veterans and powered by a community of thousands."
      </p>
      </div>
    ),
    Team: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {[
          { name: "HENG PHEAKNA", initials: "HP", role: "Director", desc: "15+ years in ed-tech" },
          { name: "Kung Norasmey", initials: "KN", role: "Vice Director", desc: "Former software architect" },
          { name: "Srin Nalen", initials: "SN", role: "Web Developer", desc: "Modern stack expert" },
          { name: "Ven ChanDarith", initials: "VC", role: "Web Developer", desc: "Marketing & Dev lead" },
        ].map((member, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {member.initials}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{member.name}</h3>
              <span className="text-indigo-500 font-medium text-sm">{member.role}</span>
              <p className="text-gray-400 text-xs mt-1">{member.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans">
      {/* Navigation Tabs */}
      <div className="flex bg-gray-200/50 p-1 rounded-xl mb-12 shadow-inner">
        {['Mission', 'Vision', 'Story', 'Team'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)} // ប្ដូរ Tab ពេលចុច
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-md' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Container បង្ហាញទិន្នន័យតាម Tab */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 p-12 min-h-[300px] flex items-center justify-center">
        <div className="w-full">
          {contentData[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;