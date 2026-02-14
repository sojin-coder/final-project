import React from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Star,
  Globe,
  Users,
  Compass,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import courses from "../data/courses";

const Detail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div className="p-10 text-center">Course not found</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className=" w-[75%] bg-gray-300 p-10 mx-auto rounded-2xl">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow mt-5">
          {/* Hero */}
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-[600px] object-cover rounded-t-xl"
            />
            <span className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
              Development
            </span>
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-3">{course.title}</h1>

            <p className="text-gray-600 mb-4">{course.description}</p>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-500" size={16} />
                4.8 (2,300)
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} /> {course.student}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {course.duration}
              </span>
            </div>
            <div className="mt-5 mb-5 w-[99%] h-[1px] bg-gray-400 mx-auto"></div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left */}
              <div className="md:col-span-2 space-y-8">
                {/* What you’ll learn */}
                <section>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* ផ្នែក Learn */}
                    <div>
                      <h2 className="font-semibold text-xl mb-4 text-slate-800">
                        What you’ll learn
                      </h2>
                      <ul className="space-y-3 text-gray-600">
                        {course.learn.map((item, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <CheckCircle
                              className="text-green-500 shrink-0"
                              size={18}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ផ្នែក Requirements */}
                    <div>
                      <h2 className="font-semibold text-xl mb-4 text-slate-800">
                        Requirements
                      </h2>
                      <ul className="space-y-3 text-gray-600">
                        {course.Requirements.map((item, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Curriculum */}
                <section className="mt-8">
                  <h2 className="flex items-center gap-2 font-bold text-2xl mb-5 text-slate-800">
                    <Compass className="text-blue-600" /> Course Curriculum
                  </h2>

                  <div className="border border-gray-200 rounded-xl overflow-hidden p-2 shadow-sm">
                    {course.curriculum.map((c, i) => (
                      <div key={i} className="border-b last:border-b-0">
                        {/* Header របស់មេរៀននីមួយៗ */}
                        <div className="bg-gray-50 flex justify-between items-center px-10 py-9 hover:bg-gray-100 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            {/* បន្ថែម Icon លេងឱ្យស្អាត */}
                            <PlayCircle
                              size={18}
                              className="text-gray-400 group-hover:text-blue-600"
                            />
                            <span className="font-medium text-slate-700">
                              {c.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 font-mono">
                              {c.time}
                            </span>
                            <ChevronDown size={18} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Instructor */}
                <section className="w-[99%] mx-auto bg-gray-200 p-10 rounded-2xl  hover:bg-gray-300">
                  <span className="font-semibold text-gray-400 mb-4">Instructor</span>
                  <p className="font-bold text-lg">{course.instructor}</p>
                  <p className="text-sm text-gray-500">
                    Senior Web Developer & Instructor
                  </p>
                </section>
              </div>

              {/* Right Card */}
              
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
                <div>
                  <p class="text-sm text-slate-600">Price</p>
                  <span className="text-4xl font-bold text-slate-900">
                    ${course.price}
                  </span>
                </div>
                <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 text-lg">Enroll Now</button>
              </div>
          </div>
          
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Detail;
