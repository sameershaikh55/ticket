import React, { useState } from "react";
import add from "../assets/icons/cross.svg";
import ManagerForm from "./ManagerForm";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { deleteManager } from "../redux/action/admin/managers";
import Loader from "../components/Loader";
import { useGetManagers } from "../utils/hooks/useGetManagers";

const ManagerCard = ({ id }) => {
  const [registerManager, setManagerRegister] = useState(false);
  const [editManagerData, setEditManagerData] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.manager);

  const managers = useGetManagers(id);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {registerManager && (
        <ManagerForm
          register={registerManager}
          setRegister={setManagerRegister}
          editData={editManagerData}
          setEditData={setEditManagerData}
          id={id}
        />
      )}

      {managers.map((content, i) => {
        const { picture, name, email, phone } = content;
        return (
          <div key={i} className="d-flex justify-content-between w-100 gap-3">
            <div className="d-flex align-items-center gap-3 w-100">
              <img className="logo rounded-circle" src={picture} alt="" />
              <div className="d-flex align-items-center w-100 gap-3">
                <input
                  className="w-100 px-2"
                  type="text"
                  value={name}
                  readOnly
                />
                <input
                  className="w-100 px-2"
                  type="text"
                  value={email}
                  readOnly
                />
                <input
                  className="w-100 px-2"
                  type="text"
                  value={phone}
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
                  setEditManagerData({ ...content });
                  setManagerRegister(true);
                }}
              />
              <img
                className="pointer"
                style={{ width: "18px" }}
                src={deleteI}
                alt=""
                onClick={() => dispatch(deleteManager(content.id, picture))}
              />
            </div>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            setManagerRegister(true);
            setEditManagerData(null);
          }}
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
