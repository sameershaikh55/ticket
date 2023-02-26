import React from "react";

const Textarea = ({ label, name, value, onChange, row }) => {
  return (
    <div className="textarea_container">
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-100"
        rows={row}
      ></textarea>
    </div>
  );
};

export default Textarea;
