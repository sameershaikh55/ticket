import React, { useState } from "react";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";
import { deleteManager } from "../redux/action/admin/managers";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";

const ManagerCardInside = ({
  picture,
  name,
  email,
  phone,
  setEditManagerData,
  setManagerRegister,
  ...content
}) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        title={name}
        action={() => dispatch(deleteManager(content.id, picture))}
        message={
          <p className="mt-4">
            You are about to permanently delete this Manager including all his
            data.
          </p>
        }
      />

      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo rounded-circle" src={picture} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input className="w-100 px-2" type="text" value={name} readOnly />
            <input className="w-100 px-2" type="text" value={email} readOnly />
            <input className="w-100 px-2" type="text" value={phone} readOnly />
          </div>
        </div>

        <div className="d-flex gap-3">
          <img
            className="pointer"
            style={{ width: "18px" }}
            src={edit}
            alt=""
            onClick={() => {
              setEditManagerData({ ...content });
              setManagerRegister(true);
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
    </>
  );
};

export default ManagerCardInside;
