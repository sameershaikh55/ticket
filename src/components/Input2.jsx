import React, { useState } from "react";

const Input = ({ label, icon, type, value, name, onChange, placeholder }) => {
  const [password, setPassword] = useState(false);

  return (
    <label className="custom_field_two">
      {password
        ? icon && (
            <div onClick={() => setPassword(!password)} className="lock">
              <img src={icon} alt="" />
            </div>
          )
        : icon && (
            <div onClick={() => setPassword(!password)} className="lock">
              <img src={icon} alt="" />
            </div>
          )}

      <input
        type={icon && !password ? "password" : "text"}
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
