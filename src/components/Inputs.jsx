import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Inputs({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  bgcolor,
  options = [],
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  // 🔥 If this is a dropdown field, render <select>
  if (type === "select") {
    return (
      <div className="input-field mb-3 w-full">
        {label && (
          <label htmlFor={name} className="block font-semibold mb-1">
            {label}
          </label>
        )}

        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          style={{ backgroundColor: bgcolor }}
          className="w-full font-semibold px-5 py-3 border rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">{placeholder}</option>

          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Normal input
  return (
    <div className="input-field mb-3 w-full">
      {label && (
        <label htmlFor={name} className="block font-semibold mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          name={name}
          id={name}
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          autoComplete="off"
          style={{ backgroundColor: bgcolor }}
          className="w-full font-semibold px-5 py-3 border rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {type === "password" && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 text-xl cursor-pointer text-gray-600"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>
    </div>
  );
}

export default Inputs;
