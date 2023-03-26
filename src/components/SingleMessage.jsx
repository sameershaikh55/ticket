import React from "react";
import doubleCheck from "../assets/icons/doubleCheck.svg";
import avatar from "../assets/avatar.png";

const SingleMessage = () => {
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
            //screenshot-firefox-12-12-23.png Explanation: Lorem ipsum dolor sit
            amet, consectetur
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
