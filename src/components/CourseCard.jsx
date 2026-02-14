// src/components/CourseCard.jsx
import { Star } from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <div className="w-[290px] h-[480px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-blue-200">
      {/* Image */}
      <div className="h-60 w-full">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-blue-600 text-sm font-medium mb-1">
          {course.category}
        </p>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 truncate">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-lg text-gray-500 mb-3">
          {course.instructor}
        </p>

        {/* Rating & Price */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-gray-400">({course.reviews})</span>
          </div>

          <span className="text-blue-600 font-bold text-lg">
            ${course.price}
          </span>
        </div>

        {/* Button */}
        <button
          className="w-full h-[60px] bg-blue-600 text-white py-2 rounded-xl
                     hover:bg-blue-700 transition font-medium"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
