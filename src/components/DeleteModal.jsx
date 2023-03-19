import React from "react";
import excelemation from "../assets/icons/excelemation.svg";
import Modal from "./Modal";

const DeleteModal = ({ isOpen, setIsOpen, title, action, message }) => {
  return (
    <>
      {isOpen && (
        <Modal noCross register={isOpen} setRegister={setIsOpen}>
          <div className="container-fluid">
            <div className="d-flex align-items-center gap-4">
              <img src={excelemation} alt="" />
              <p className="mb-0">Remove {title}?</p>
            </div>
            {message}

            <div className="d-flex justify-content-end mt-4 gap-3">
              <button
                onClick={() => {
                  action();
                  setIsOpen(false);
                }}
                className="text-white bg-danger px-4 rounded-3 border-0 py-1"
              >
                Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 rounded-3 border-0 py-1 bg-transparent"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteModal;
