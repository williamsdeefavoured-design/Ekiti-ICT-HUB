import React from 'react'
import logoimg from "../assets/ekiti-logo-1.png";
import wako from "../assets/wakocode-logo.png"; 
import aboutimg from "../assets/About-img.png"; 


function About() {
  return (
    <div className="flex flex-col items-center mx-10 justify-center py-20">
      <div className="logos flex flex-wrap gap-5 justify-center items-center mt-10 mb-10">
        <h1 className='text-4xl font-extrabold  border-b-2 pb-1 border-orange-600'>Powered By</h1>
        <img className="w-40 md:w-30 h-auto object-contain" src={logoimg} alt="Ekiti Logo" />
        <img className="w-50 md:w-50 h-auto object-contain" src={wako} alt="Wakocode Logo" />

      </div>

      <div className="about-section md:gap-30 md:p-7 flex flex-col md:flex-row items-center justify-center">
        <div className="left md:w-160 text-center md:text-start ">
          <h2 className='text-2xl md:text-4xl mb-5 font-extrabold'><span>About The Program</span></h2>
          <p className='mb-3 font-medium'>The Ekiti State MSME ICT Skill Acquisition Hub is a transformative initiative developed in collaboration with Wakocode Technologies. This program is dedicated to empowering the youth of Ekiti State by providing them with in-demand ICT skills that are critical for success in today's global digital economy.
          Through this initiative, participants will gain hands-on training in Full Stack Development, Cloud Computing, Cybersecurity, Backend Development, and Data Analytics—skills that are vital to thrive in both local and international job markets.
          </p>
          <button className="button-1">Learn More</button>
        </div>

        <div className="right">
         <img className="w-full max-w-md md:max-w-xl h-auto object-contain" src={aboutimg} alt="About Program" />
        </div>
        
      </div>
    </div>
  )
}

export default About