import React from "react";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../redux/action/admin/team";

const TeamCard = ({
  picture,
  email,
  name,
  projects,
  id,
  setEditData,
  setRegister,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="client_card gap-3">
      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo rounded-circle" src={picture} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input className="w-100 px-2" type="text" value={name} readOnly />
            <input className="w-100 px-2" type="text" value={email} readOnly />
            <input
              className="w-100 px-2"
              type="text"
              value={projects}
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
            onClick={() => {
              setEditData({ picture, email, name, projects, id });
              setRegister(true);
            }}
          />
          <img
            className="pointer"
            style={{ width: "18px" }}
            src={deleteI}
            alt=""
            onClick={() => dispatch(deleteTeam(id, picture))}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
