import React from "react";
import { AiOutlineEye } from "react-icons/ai";

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
  const listId = `${name || label}-list`;

  return (
    <div className="input-field mb-3 w-full">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          style={{ backgroundColor: bgcolor }}

          /* RESPONSIVE WIDTH HERE */
          className="w-full
            font-semibold px-5 py-3 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-orange-500
          "
          list={options.length > 0 ? listId : undefined}
          required
        />

        {/* Eye icon only for password */}
        {type === "password" && (
          <p className="absolute right-4 text-xl cursor-pointer text-gray-600">
            <AiOutlineEye />
          </p>
        )}
      </div>

      {options.length > 0 && (
        <datalist id={listId}>
          {options.map((option, i) => (
            <option key={i} value={option} />
          ))}
        </datalist>
      )}
    </div>
  );
}

export default Inputs;
