import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SelectBox = ({ state, label, name, options, onChange }) => {
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

  const filteredData = options.filter((obj) =>
    obj.html.props.children.includes(state)
  );

  return (
    <div className="select-box-container">
      <div
        className="select-box-selected-option"
        onClick={() => {
          const optionsContainer = document.querySelector(
            `#select-box-options-container-${name}`
          );
          optionsContainer.classList.toggle("show");
        }}
      >
        <div className="select-box-selected-option-text">
          {filteredData[0].html}
        </div>
        <IoIosArrowDown size={16} className="select-box-icon" />
      </div>

      <span className="placeholder_">{label}</span>

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
          >
            {option.html}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
