import React from "react";
import { Check, } from "lucide-react";

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
    <div className="relative w-[80%] py-16 ">
      
      {/* Center line */}
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-200 "></div>

      <div className="space-y-20">
        {timelineData.map((item, index) => (
          <div key={index} className="relative flex items-center">

            {/* Card */}
            <div
              className={`w-5/12 rounded-xl bg-white p-6 shadow-lg
              ${index % 2 === 0 ? "ml-auto text-left" : "mr-auto text-left"}`}
            >
              <h2 className="text-xl font-bold text-blue-600">
                {item.year}
              </h2>
              <h3 className="mt-2 text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {item.desc}
              </p>
            </div>

            {/* Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
              <Check size={18} />
              {/* <CircleCheckBig  size={18}/> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
