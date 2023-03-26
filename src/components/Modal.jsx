import React from "react";
import cross from "../assets/icons/cross.svg";

const Modal = ({ children, register, setRegister, noCross }) => {
  return (
    <div
      style={{
        transform: (register && "scale(1)") || "scale(0)",
      }}
      className="modal"
    >
      <div
        style={{
          maxWidth: (noCross && "420px") || "auto",
        }}
        className="inner_modal"
      >
        {!noCross && (
          <button
            onClick={() => setRegister(false)}
            className="cross bg-transparent border-0 p-0"
          >
            <img style={{ transform: "rotate(90deg)" }} src={cross} alt="" />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
