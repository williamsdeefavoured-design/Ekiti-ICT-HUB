// Hero.jsx
import React, { useEffect, useState } from "react";
import mainimg from "../assets/main-img.png"; // adjust path if needed

const Hero = () => {

 const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);


  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card container */}
        <div className={`everything h-full md:h-150 bg-[#ffd518] rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-5 p-6 md:p-10 transition-opacity duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          
          {/* LEFT: text */}
          <div className="left flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0b1220]">
              <span className="text-[#D64700]">Ekiti State</span> MSME ICT
             Skill Acquisition Hub:
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#0b1220]/90">
              Empowering the future of innovators — simple, hands-on training for
              entrepreneurs, developers and makers.
            </p>

            {/* <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#0b1220]">
              Attendance WebApp
            </h3> */}
          </div>

          {/* RIGHT: image */}
          <div className="right shrink-0 flex justify-center md:justify-end">
            <img
              src={mainimg}
              alt="Students learning at the Ekiti MSME ICT Hub"
              className="sm:w-140 md:w-100 xl:w-full h-auto object-contain"
              draggable="false"
            />
          </div>
        </div>
      </div>
  );
};

export default Hero;
