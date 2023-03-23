import React, { useState } from "react";
import DeleteModal from "../components/DeleteModal";
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
  password,
  setEditData,
  setRegister,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        title={name}
        action={() => dispatch(deleteTeam(id, picture))}
        message={
          <p className="mt-4">
            You are about to permanently delete this Team Member including all
            his data.
          </p>
        }
      />
      <div className="client_card gap-3">
        <div className="d-flex justify-content-between w-100 gap-3">
          <div className="d-flex align-items-center gap-3 w-100">
            <img className="logo rounded-circle" src={picture} alt="" />
            <div className="d-flex align-items-center w-100 gap-3">
              <input className="w-100 px-2" type="text" value={name} readOnly />
              <input
                className="w-100 px-2"
                type="text"
                value={email}
                readOnly
              />
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
                setEditData({ picture, email, name, projects, id, password });
                setRegister(true);
              }}
            />
            <img
              className="pointer"
              style={{ width: "18px" }}
              src={deleteI}
              alt=""
              onClick={() => setDeleteModal(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
