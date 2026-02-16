import React from "react";
import { Check } from "lucide-react";

const timelineData = [
  {
    year: "2018",
    title: "Company Founded",
    desc: "Started with a vision to make education accessible",
  },
  {
    year: "2019",
    title: "10K Students",
    desc: "Reached our first major milestone",
  },
  {
    year: "2021",
    title: "100+ Courses",
    desc: "Expanded our course catalog significantly",
  },
  {
    year: "2024",
    title: "50K+ Students",
    desc: "Growing community of learners worldwide",
  },
];

const Timeline = () => {
  return (
    <div className="relative max-w-6xl mx-auto py-20 px-4">
      
      {/* Center Line */}
      <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-blue-200 md:-translate-x-1/2"></div>

      <div className="space-y-14">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center 
            ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >

            {/* Card */}
            <div
              className="
              ml-12 md:ml-0
              md:w-5/12
              rounded-2xl bg-white p-6
              shadow-md hover:shadow-xl
              transition duration-300
              "
            >
              <h2 className="text-lg font-bold text-blue-600">
                {item.year}
              </h2>

              <h3 className="mt-1 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Icon */}
            <div
              className="
              absolute left-4 md:left-1/2
              flex h-10 w-10 items-center justify-center
              rounded-full bg-blue-600 text-white
              shadow-lg md:-translate-x-1/2
              "
            >
              <Check size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
