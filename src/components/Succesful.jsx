import React from "react";
import successImg from "../assets/success.png";

function Succesful({ successTxt }) {
  return (
    <div
      className="
  fixed inset-0 
  bg-black/40 
  flex items-center justify-center 
  z-50
"
    >
      <div
        className="
    bg-white 
    p-8 
    rounded-2xl 
    shadow-2xl 
    flex flex-col 
    items-center 
    gap-4
  "
      >
        <img src={successImg} className="w-20" />
        <h2 className="text-xl font-bold text-green-600">{successTxt}</h2>
      </div>
    </div>
  );
}

export default Succesful;
