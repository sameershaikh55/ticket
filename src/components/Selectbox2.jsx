import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SelectBox2 = ({ state, label, name, options, onChange }) => {
  useEffect(() => {
    const handleClick = (event) => {
      const optionsContainer = document.querySelector(
        `#select-box-options-container-${name}`
      );
      if (!optionsContainer.contains(event.target)) {
        optionsContainer.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const filteredData = options.filter((obj) => obj.value === state);

  return (
    <div className="select-box-container">
      <div
        style={{
          border: "none",
          background: filteredData[0]?.bg,
          padding: "2px 6px",
          fontSize: "14px",
          minWidth: "150px",
          color: (filteredData[0]?.bg === "#ffea4b" && "#000") || "#fff",
        }}
        className="select-box-selected-option"
        onClick={() => {
          const optionsContainer = document.querySelector(
            `#select-box-options-container-${name}`
          );
          optionsContainer.classList.toggle("show");
        }}
      >
        {state}
        <IoIosArrowDown
          color={(filteredData[0]?.bg === "#ffea4b" && "#000") || "#fff"}
          size={16}
          className="select-box-icon"
        />
      </div>

      <div
        id={`select-box-options-container-${name}`}
        className="select-box-options-container"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`select-box-option ${
              option.value === state ? "selected" : ""
            }`}
            onClick={() => {
              onChange({
                target: {
                  name: name,
                  value: option.value,
                },
              });
              document
                .querySelector(`#select-box-options-container-${name}`)
                .classList.remove("show");
            }}
            style={{
              fontSize: "14px",
            }}
          >
            {option.html}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBox2;
