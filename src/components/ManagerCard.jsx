import React, { useState } from "react";
import add from "../assets/icons/cross.svg";
import ManagerForm from "./ManagerForm";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useGetManagers } from "../utils/hooks/useGetManagers";
import ManagerCardInside from "./ManagerCardInside";

const ManagerCard = ({ id }) => {
  const [registerManager, setManagerRegister] = useState(false);
  const [editManagerData, setEditManagerData] = useState(false);

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
        return (
          <div key={i}>
            <ManagerCardInside
              {...content}
              setEditManagerData={setEditManagerData}
              setManagerRegister={setManagerRegister}
            />
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
