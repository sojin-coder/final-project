// src/pages/About.jsx
import React from "react";
import Timeline from "../components/Timeline";
import {
  Eye,
  Target,
  Heart,
  ShieldCheck,
  UserRound,
  Globe,
  Quote,
  Star,
  Leaf,
  HandHeart,
  Handshake,
} from "lucide-react";

function About() {
  return (
    <div className="mt-5">
      <div
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden shadow-2xl transition-all duration-1000 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1665669278652-bc140608a24a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-4xl md:text-7xl font-bold tracking-tighter">
            Experience the Art of Coffee
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg italic mt-4">
            "Premium beans, roasted with passion, brewed for you."
          </p>
          <button className="mt-8 px-8 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-lg">
            Explore Menu
          </button>
        </div>
      </div>
      <div className="p-8  bg-white mb-3 w-[75%] m-auto rounded-xl shadow shadow-gray-500">
        <h1 className="text-4xl font-bold text-center mb-5">
          Our <span className="text-[#a65b3c]">Mission & Values</span>{" "}
        </h1>
        {/* box */}
        <div className="flex justify-between gap-10 p-8">
          {/* box_one */}
          <div className="bg-gray-100 p-10 rounded-2xl shadow-2xl shadow-gray-400 w-[30%] ">
            <div className=" w-20 h-20  bg-blue-100 rounded-full flex items-center justify-center mx-auto  mb-4">
              {/* <icon /> */}
              <Leaf className="text-green-600 " size={35} />
            </div>
            <h1 className="text-4xl font-bold mt-3 mb-5">Sustainability</h1>
            <p className="text-lg p-2">
              We source 100% ethically grown beans and use eco-friendly
              packaging to minimize our environmental impact.
            </p>
          </div>
          {/* box_two */}
          <div className="bg-gray-100 p-10 rounded-2xl shadow-2xl  shadow-gray-400 w-[30%]">
            <div className=" w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {/* icon /> */}
              <HandHeart className="text-red-600" size={35} />
            </div>
            <h1 className="text-4xl font-bold mt-3 mb-5 text-center">
              Our Mission
            </h1>
            <p className="text-lg p-2">
              Every cup is crafted with precision using freshly roasted beans
              and artisanal brewing techniques.
            </p>
          </div>
          {/* box_three */}
          <div className="bg-gray-100 p-10 rounded-2xl shadow-2xl shadow-gray-400 w-[30%]">
            <div className=" w-20 h-20 bg-blue-100 rounded-full flex mx-auto items-center justify-center  mb-4">
              {/* icon /> */}
              <Handshake className="text-blue-600" size={35} />
            </div>
            <h1 className="text-4xl font-bold mt-3 mb-5 line-clamp-1">
              Community Focus
            </h1>
            <p className="text-lg p-2">
              We support local farmers and regularly host community events in
              our space.
            </p>
          </div>
        </div>
        {/* ----Our Story--- */}
        <div className="mt-20 mb-20">
          <h1 className="text-center font-bold text-5xl uppercase text-shadow-lg/30 ">
            Our <span className="text-[#ba582e]">Journey</span>
          </h1>
          <div className="w-[80%] m-auto "></div>
        </div>
        {/* TimeLine */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Timeline />
        </div>

        {/* our coffee */}
        <div className="mt-30 bg-gray-50  p-2">
          <h1 className="text-center text-4xl font-bold mt-20">
            Our Core Values
          </h1>
          <p className=" text-center w-[50%] pt-10 m-auto text-xl ">
            {" "}
            These principles guide everything we do and shape our commitment to
            our students.
          </p>
        </div>
        {/*  */}
        <div className="bg-[#b6562e] w-[100%] mt-10 p-10">
          <div className="mt-20 w-[97%] m-auto  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-30">
              <div className="text-center shadow-lg  rounded-2xl p-5 hover:shadow-2xl shadow-gray-100">
                <div className=" w-16 h-16  text-blue-700 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-6">
                  {/* <UserRound /> */}
                  <Heart size={40} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-100">
                  {" "}
                  Passion for Learning
                </h3>
                <p className=" text-gray-300 text-lg mt-5 ">
                  {" "}
                  We believe education transforms lives and opens doors to
                  endless possibilities.
                </p>
              </div>
              <div className="text-center shadow-lg  rounded-2xl p-5 hover:shadow-2xl shadow-gray-100">
                <div className=" w-16 h-16 text-blue-700 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-6">
                  {/* <Clock4 /> */}
                  <UserRound size={40} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-100"> Student-Centered</h3>
                <p className=" text-gray-300 text-lg mt-5">
                  {" "}
                  Every decision we make puts our students first, ensuring the
                  best learning experience.
                </p>
              </div>
              <div className="text-center shadow-lg  rounded-2xl p-5 hover:shadow-2xl shadow-gray-100">
                <div className=" w-16 h-16 text-blue-700 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-6">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-100"> Quality Excellence</h3>
                <p className=" text-gray-300 text-lg mt-5">
                  {" "}
                  We maintain the highest standards in course content,
                  instruction, and support.
                </p>
              </div>
              <div className="text-center shadow-lg rounded-2xl p-5 hover:shadow-2xl shadow-gray-100">
                <div className=" w-16 h-16 text-blue-700 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-6">
                  {/* <Headset /> */}
                  <Globe size={40} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-100">Global Community</h3>
                <p className=" text-gray-300 text-lg mt-5">
                  {" "}
                  Building a diverse, inclusive community of learners from
                  around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-30 bg-gray-50 p-2">
          <h1 className="text-center text-4xl font-bold mt-20">
            Meet Our Team
          </h1>
          <p className=" text-center w-[50%] text-gray-500 pt-5 m-auto text-xl mb-15 ">
            {" "}
            Passionate professionals dedicated to transforming online education.
          </p>
        </div> */}
        <div className="mt-15  w-[95%] m-auto ">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-80 flex items-center justify-center w-full">
                <img

                  className="w-full"
                  src="https://etec-system.42web.io/assets/lokru.png"
                  alt=""
                />
              </div>
              <div className="p-6 text-center mt-10 mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {" "}
                  HENG PHEAKNA
                </h3>
                <p className="text-blue-600 font-semibold mb-3"> Director</p>
                <p className="text-gray-600 text-sm">
                  {" "}
                  15+ years in education technology
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-80 flex items-center justify-center w-full">
                <img
                  className="w-full"
                  src="https://etec-system.42web.io/assets/mimg.png"
                  alt=""
                />
              </div>
              <div className="p-6 text-center mt-10 mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {" "}
                  Kung Norasmey
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {" "}
                  Vice Director
                </p>
                <p className="text-gray-600 text-sm">
                  {" "}
                  Former software architect at tech giants
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-80 flex items-center justify-center w-full">
                <img
                  className="w-full"
                  src="https://etec-system.42web.io/assets/nalen.png"
                  alt=""
                />
              </div>
              <div className="p-6 text-center mt-10 mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {" "}
                  Srin Nalen
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Web Developer
                </p>
                <p className="text-gray-600 text-sm">
                  {" "}
                  Former software architect at tech giants
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-80 flex items-center justify-center w-full">
                <img
                  className="w-full"
                  src="https://etec-elearning.vercel.app/assets/dev-darith-DghgE6Pg.jpg"
                  alt=""
                />
              </div>
              <div className="p-6 text-center mt-10 mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {" "}
                  Ven ChanDarith
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Web Developer
                </p>
                <p className="text-gray-600 text-sm">
                  {" "}
                  Expert in digital marketing strategy Former software architect
                  at tech giants
                </p>
              </div>
            </div>
          </div> */}
          <div className="bg-gray-200 mt-10 rounded-2xl w-[100%]">
            <div className="p-5">
              <h1 className="text-center font-bold text-4xl text-gray-700 mt-5">
                What Our Students Say
              </h1>
              <p className="text-center p-3 text-lg mt-3 text-gray-600">
                Real feedback from real students who transformed their careers
                with us.
              </p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 p-4">
              {/* ========Card1============ */}

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden p-5">
                <div className="bg-white p-8 rounded-xl  text-blue-800">
                  <Quote size={50} />
                </div>

                <p className="text-gray-600 mb-6 text-lg italic">
                  {" "}
                  LearnHub really kickstarted my career! The courses are clear,
                  practical, and the instructors actually care about your
                  growth. Couldn't recommend it more!
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    <img
                      className="w-24 h-24  "
                      src="https://i.pinimg.com/736x/60/a1/71/60a1719d559469dbb6bfa1b6d0890e5e.jpg"
                      alt=""
                    />
                  </div>

                  <div className="">
                    <div className="font-bold text-gray-900">
                      {" "}
                      Alex Thompson
                    </div>
                    <div className="text-sm text-gray-600">
                      {" "}
                      Software Developer
                    </div>
                  </div>
                </div>
                <div className=" flex space-x-1 mt-4 ">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              {/* ========Card1============ */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden p-5">
                <div className="bg-white p-8 rounded-xl  text-blue-800">
                  <Quote size={50} />
                </div>

                <p className="text-gray-600 mb-6 text-lg italic">
                  {" "}
                  Taking courses here was hands-down the best decision for my
                  career. The content is engaging, and the support team feels
                  like part of the journey.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    <img
                      className="w-24 h-24  "
                      src="https://i.pinimg.com/736x/c4/d4/af/c4d4afa5d0bcdb35110c71d5adb7a8d7.jpg"
                      alt=""
                    />
                  </div>

                  <div className="">
                    <div className="font-bold text-gray-900"> Maria Garcia</div>
                    <div className="text-sm text-gray-600"> UX Designer</div>
                  </div>
                </div>
                <div className=" flex space-x-1 mt-4">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              {/* ========Card1============ */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden p-5">
                <div className="bg-white p-8 rounded-xl  text-blue-800">
                  <Quote size={50} />
                </div>


                <p className="text-gray-600 mb-6 text-lg italic">
                  {" "}
                  I love that I can learn at my own pace. The platform is
                  intuitive, the lessons are practical, and I've already started
                  applying what I learned at work!
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    <img
                      className="w-24 h-24  "
                      src="https://i.pinimg.com/1200x/55/06/62/55066253d0d056c690cfb49f4f91ff82.jpg"
                      alt=""
                    />
                  </div>

                  <div className="">
                    <div className="font-bold text-gray-900"> James Wilson</div>
                    <div className="text-sm text-gray-600">
                      {" "}
                      Marketing Manager
                    </div>
                  </div>
                </div>
                <div className=" flex space-x-1 mt-4">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-20">
            <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="font-bold text-5xl text-center p-4 text-white ">
                  Join Our Growing Community
                </h1>
                <p className="text-center text-xl mt-3 mb-10 text-white">
                  Start your learning journey today and become part of something
                  amazing.
                </p>
                <button className=" px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
                  {" "}
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
