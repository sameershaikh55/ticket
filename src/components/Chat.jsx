import React, { useState } from "react";
import edit from "../assets/icons/edit.svg";
import doubleCheck from "../assets/icons/doubleCheck.svg";
import avatar from "../assets/avatar.png";
import TextEditor from "./TextEditor";
import { getDateTime } from "../utils/getDateTime";
import TicketForm from "./TicketForm";

const Chat = ({ createdBy, singleTicket: ticket }) => {
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState(false);

  return (
    <div className="chat_container">
      <TicketForm
        register={register}
        setRegister={setRegister}
        editData={editData}
        setEditData={setEditData}
        messageNotRequried
      />

      <div className="inner_chat_container">
        <div className="inner_chat_messages_container">
          <div className="single_message d-flex align-items-start gap-2">
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
                    <img
                      className="screenshot mt-1 rounded-2"
                      src={ticket.screenshot}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {[1, 1, 1, 1, 1].map(() => {
            return (
              <div className="single_message me d-flex align-items-start gap-2">
                <img className="avatar" src={avatar} alt="" />
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <div className="d-flex align-items-center gap-2">
                      <p className="f14 mb-0">Amir (Faktor 22)</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p className="f14 mb-0">21-01-2023 | 14:00 uur</p>
                      <img src={doubleCheck} alt="" />
                    </div>
                  </div>
                  <div>
                    <p className="f12 mb-0">
                      Where’s the problem? (url): https://google.nl Screenshot:
                      //screenshot-firefox-12-12-23.png Explanation: Lorem ipsum
                      dolor sit amet, consectetur
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="textbox_container">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default Chat;
