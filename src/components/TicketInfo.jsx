import React from "react";
import { useState } from "react";
import TicketForm from "./TicketForm";
import { getDateTime } from "../utils/getDateTime";
import edit from "../assets/icons/edit.svg";

const TicketInfo = ({ createdBy, singleTicket: ticket }) => {
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState(false);

  return (
    <div className="single_message d-flex align-items-start gap-2">
      <TicketForm
        register={register}
        setRegister={setRegister}
        editData={editData}
        setEditData={setEditData}
        messageNotRequried
      />

      <img className="avatar" src={createdBy?.picture} alt="" />
      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center mt-1">
          <div className="d-flex align-items-center gap-2">
            <p className="f14 mb-0">{createdBy?.name}</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="f14 mb-0">
              {ticket?.createdAt ? getDateTime(ticket.createdAt) : ""}
            </p>
            <img
              onClick={() => {
                setEditData({ ...ticket });
                setRegister(true);
              }}
              src={edit}
              alt=""
              className="pointer"
            />
          </div>
        </div>
        <div>
          <div className="f12 d-flex flex-column">
            <div>Where’s the problem? (url): {ticket.problem}</div>
            <div>Explanation: {ticket.explanation}</div>
            <div className="d-flex align-items-start gap-2">
              Screenshot:
              <a href={ticket.screenshot} target="_blank">
                <img
                  className="screenshot mt-1 rounded-2"
                  src={ticket.screenshot}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
