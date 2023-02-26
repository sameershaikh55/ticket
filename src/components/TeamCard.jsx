import React from "react";
import avatar from "../assets/avatar.png";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";

const TeamCard = () => {
  return (
    <div className="client_card gap-3">
      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo" src={avatar} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input
              className="w-100 px-2"
              type="text"
              value="KPN Nederland"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="KPN"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="01-01-2023"
              name=""
              id=""
              readOnly
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <img style={{ width: "18px" }} src={edit} alt="" />
          <img style={{ width: "18px" }} src={deleteI} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
