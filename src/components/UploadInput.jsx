import React from "react";

const UploadInput = ({
  label,
  icon,
  type,
  value,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <label htmlFor={name} className="custom_field_two">
      <div className="lock">
        <img src={icon} alt="" />
      </div>

      <input
        type="text"
        value={value}
        placeholder={`Enter ${placeholder}`}
        readOnly
      />

      <input
        className="d-none"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
      />
      <span className="placeholder_">{label}</span>
    </label>
  );
};

export default UploadInput;
