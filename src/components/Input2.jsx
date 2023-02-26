import React from "react";

const Input = ({ label, icon, type, value, name, onChange, placeholder }) => {
  return (
    <label className="custom_field_two">
      <div className="lock">
        <img src={icon} alt="" />
      </div>

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="placeholder_">{label}</span>
    </label>
  );
};

export default Input;
