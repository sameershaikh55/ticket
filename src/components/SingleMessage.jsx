import React from "react";
import doubleCheck from "../assets/icons/doubleCheck.svg";
import avatar from "../assets/avatar.png";
import useCreatedBy from "../hooks/useCreatedBy";
import { getDateTime } from "../utils/getDateTime";

const SingleMessage = ({ message, createdBy }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  let user = useCreatedBy(createdBy);
  user = user[0];

  return (
    <div
      className={`single_message d-flex align-items-start gap-2 ${
        (auth.id !== user?.id && "me") || ""
      }`}
    >
      <img className="avatar" src={avatar} alt="" />
      <div className="d-flex flex-column gap-3 w-100">
        <div className="d-flex justify-content-between align-items-center mt-1 w-100">
          <div className="d-flex align-items-center gap-2">
            <p className="f14 mb-0">{user?.name}</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p className="f14 mb-0">{getDateTime(user?.createdAt)}</p>
            <img src={doubleCheck} alt="" />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      </div>
    </div>
  );
};

export default SingleMessage;
