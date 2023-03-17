import React, { useState } from "react";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";
import { useDispatch } from "react-redux";
import { deleteClient } from "../redux/action/admin/clients";
import ManagerCard from "./ManagerCard";

const ClientCard = ({
  name,
  shortcode,
  createdAt,
  logo,
  id,
  systems,
  sla,
  setEditData,
  setRegister,
}) => {
  const dispatch = useDispatch();

  const originalDate = new Date(createdAt);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return (
    <div className="client_card gap-3">
      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo rounded-1" src={logo} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input className="w-100 px-2" type="text" value={name} readOnly />
            <input
              className="w-100 px-2"
              type="text"
              value={shortcode}
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value={formattedDate}
              readOnly
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <img
            style={{ width: "18px" }}
            src={edit}
            alt=""
            onClick={() => {
              setEditData({ shortcode, logo, name, sla, systems, id });
              setRegister(true);
            }}
            className="pointer"
          />
          <img
            onClick={() => dispatch(deleteClient(id, logo))}
            style={{ width: "18px" }}
            src={deleteI}
            alt=""
            className="pointer"
          />
        </div>
      </div>

      <ManagerCard id={id} />
    </div>
  );
};

export default ClientCard;
