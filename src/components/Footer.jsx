import React from 'react'
import logoimg from "../assets/ekiti-logo-1.png";


function Footer() {
  return (
    <div className="footer flex flex-col relative bottom-0 md:flex-row items-center justify-evenly bg-[#0B7300] text-white">
        <div className="logo">
            <img className='w-40 p-5' src={logoimg} alt="" />
        </div>

        <div className="right flex gap-5 text-center md:text-start flex-col md:flex-row">
            <h1 className='md:border-r-2 pr-5'>Powered By</h1>
            <a href="#" className='md:border-r-2 pr-5'>Wakocode</a>
            <a href="#" className=':md:border-r-2 pr-5'>Terms & Conditions</a>
            <p>© 2025 All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer