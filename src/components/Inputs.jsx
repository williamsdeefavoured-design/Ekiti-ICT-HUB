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
  width = "100%",
  options = [],
}) {
  const listId = `${name || label}-list`;

  return (
    <div className="input-field mb-3 w-full">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label}
      </label>

      <div className="flex items-center">
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          style={{
            backgroundColor: bgcolor,
            width: width, // ⬅️ HERE BRO!!!
          }}
          list={options.length > 0 ? listId : undefined}
          required
          className="flex font-semibold px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />{" "}
        <p className="ml-[-4vh] text-xl cursor-pointer">
          <AiOutlineEye></AiOutlineEye>
        </p>
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
