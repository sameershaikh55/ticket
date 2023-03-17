import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import add from "../assets/icons/cross.svg";
import ManagerForm from "./ManagerForm";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";

const ManagerCard = () => {
  const [registerManager, setManagerRegister] = useState(false);
  const [editManagerData, setEditManagerData] = useState(false);

  return (
    <>
      {registerManager && (
        <ManagerForm
          register={registerManager}
          setRegister={setManagerRegister}
          editData={editManagerData}
          setEditData={setEditManagerData}
        />
      )}

      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo" src={avatar} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input
              className="w-100 px-2"
              type="text"
              value="KPN Nederland"
              readOnly
            />
            <input className="w-100 px-2" type="text" value="KPN" readOnly />
            <input
              className="w-100 px-2"
              type="text"
              value="01-01-2023"
              readOnly
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <img
            className="pointer"
            style={{ width: "18px" }}
            src={edit}
            alt=""
          />
          <img
            className="pointer"
            style={{ width: "18px" }}
            src={deleteI}
            alt=""
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => setManagerRegister(true)}
          className="d-flex align-items-center gap-2 bg-transparent border-0 fw500"
        >
          <img style={{ width: "18px" }} src={add} alt="" />
          Add Project Manager
        </button>
      </div>
    </>
  );
};

export default ManagerCard;
