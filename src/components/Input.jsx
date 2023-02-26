import React, { useState } from "react";

const Input = ({ label, icon, type, value, name, onChange }) => {
  const [password, setPassword] = useState(false);

  return (
    <label className="custom-field one">
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

      {(type && (
        <input
          type="date"
          placeholder=" "
          name={name}
          value={value}
          onChange={onChange}
        />
      )) || (
        <input
          type={icon && !password ? "password" : "text"}
          placeholder=" "
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      <span className="placeholder">{label}</span>
    </label>
  );
};

export default Input;
