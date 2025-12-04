import React from "react";

function StudentTotCard({
  title,
  value,
  subtitle,
  bgColor = "bg-yellow-400",
  textColor = "text-white",
}) {
  return (
    <div
      className={`
        ${bgColor} ${textColor}
        w-full 
        studentTotalCard 
        px-6 py-5 
        mt-5 
        text-center 
        rounded-xl 
        border border-orange-700 
        flex flex-col 
        items-center 
        justify-center
        shadow-md
      `}
    >
      <p className="font-bold text-base md:text-lg">{title}</p>

      <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl">
        {value}
      </h1>

      {subtitle && (
        <p className="font-medium text-sm md:text-base mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default StudentTotCard;
