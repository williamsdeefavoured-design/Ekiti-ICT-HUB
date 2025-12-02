import React, { useState, useEffect } from "react";

function StudentTotCard({ title, value, subtitle, bgColor = "bg-yellow-400", textColor = "text-white"}) {
  return (
    <div className={`${bgColor} ${textColor} studentTotalCard px-8 py-3 mt-5 text-center rounded-xl border border-orange-700`}>
      <p className="font-bold">{title}</p>
      <h1 className="font-bold text-6xl">{value}</h1>
      {subtitle && <p className="font-medium">{subtitle}</p>}
    </div>
  );
}

export default StudentTotCard;
