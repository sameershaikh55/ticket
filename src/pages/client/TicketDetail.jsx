import React, { useState } from "react";
import check from "../../assets/check.svg";
import edit from "../../assets/icons/edit.svg";
import doubleCheck from "../../assets/icons/doubleCheck.svg";
import avatar from "../../assets/avatar.png";
import deleteI from "../../assets/icons/delete.svg";
import cross from "../../assets/icons/cross.svg";
import { Link } from "react-router-dom";
import SelectBox2 from "../../components/Selectbox2";
import DeleteModal from "../../components/DeleteModal";

const TicketDetail = () => {
  const [register, setRegister] = useState(false);
  const [addTicketHandle, setAddTicketHandle] = useState({
    priority: "Low",
    type: "Issue",
    status: "To Do",
  });
  const fields = [
    {
      label: "Priority",
      name: "priority",
      options: [
        {
          value: "Low",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="yellow"></div>Low
            </div>
          ),
          bg: "#ffea4b",
        },
        {
          value: "Medium",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="orange"></div>Medium
            </div>
          ),
          bg: "#fd8329",
        },
        {
          value: "High",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="red"></div>High
            </div>
          ),
          bg: "#f04d4d",
        },
      ],
    },
    {
      label: "Type",
      name: "type",
      options: [
        {
          value: "Issue",
          html: <>Issue</>,
          bg: "#2e343d",
        },
        {
          value: "Question",
          html: <>Question</>,
          bg: "#2e343d",
        },
      ],
    },
    {
      label: "Status",
      name: "status",
      options: [
        {
          value: "To Do",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="cream"></div>To Do
            </div>
          ),
          bg: "#facea0",
        },
        {
          value: "In Progress",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="blue"></div>In Progress
            </div>
          ),
          bg: "#4f8df2",
        },
        {
          value: "Done",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="green"></div>Done
            </div>
          ),
          bg: "#3eb45e",
        },
      ],
    },
  ];

  const handleChange = (e) => {
    setAddTicketHandle({
      ...addTicketHandle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ticket_container d-flex flex-column">
      <DeleteModal
        isOpen={register}
        setIsOpen={setRegister}
        title="BSL-1"
        action={() => alert(";p;")}
      />

      <Link to="/">
        <img className="cross" src={cross} alt="" />
      </Link>

      <div className="d-flex align-items-center color1 gap-2">
        <img style={{ maxWidth: "20px" }} src={check} alt="" />
        <p className="mb-0 fw400 f15 opacity-50">Ticket: KPN-1</p>
      </div>
      <p className="f18 mt-1">
        Graag de footer tekst aanpassen en volgende logo’s toevoegen.
      </p>

      <div className="main_chat_container">
        <div className="row">
          <div className="col-9">
            <div className="chat_container">
              <div className="inner_chat_container">
                <div className="inner_chat_messages_container">
                  <div className="single_message d-flex align-items-start gap-2">
                    <img src={avatar} alt="" />
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <div className="d-flex align-items-center gap-2">
                          <p className="f14 mb-0">Jan Smith</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <p className="f14 mb-0">21-01-2023 | 14:00 uur</p>
                          <img src={edit} alt="" />
                        </div>
                      </div>
                      <div>
                        <p className="f12">
                          Where’s the problem? (url): https://google.nl
                          Screenshot: //screenshot-firefox-12-12-23.png
                          Explanation: Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. In ut dui urna. Vivamus mollis, nisl
                          ac eleifend porta, metus mauris tempus nunc, eget
                          cursus massa leo sed lorem. Vivamus tempor arcu eu
                          cursus pretium.
                        </p>
                      </div>
                    </div>
                  </div>
                  {[1, 1, 1, 1, 1].map(() => {
                    return (
                      <div className="single_message me d-flex align-items-start gap-2">
                        <img src={avatar} alt="" />
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
                              Where’s the problem? (url): https://google.nl
                              Screenshot: //screenshot-firefox-12-12-23.png
                              Explanation: Lorem ipsum dolor sit amet,
                              consectetur
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="textbox_container"></div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex flex-column h-100">
              <div className="details_container d-flex flex-column justify-content-between h-100">
                <div>
                  <h6 className="mb-0 fw400 px-2 pt-3 pb-2">Details</h6>
                  <hr className="my-1" />
                  <ul className="list-unstyled d-flex flex-column gap-3 px-2 py-2 mb-0">
                    {fields.map((content, i) => {
                      return (
                        <li
                          key={i}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <p className="mb-0">{content.label}</p>
                          <div>
                            <SelectBox2
                              {...content}
                              state={addTicketHandle[content.name]}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <hr className="my-1" />
                  <ul className="list-unstyled d-flex flex-column gap-2 px-2 py-2 mb-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">Team</p>
                      <div>
                        <img
                          style={{
                            marginRight: "-10px",
                            width: "25px",
                            height: "25px",
                          }}
                          src={avatar}
                          alt=""
                        />
                        <img
                          style={{
                            marginRight: "-10px",
                            width: "25px",
                            height: "25px",
                          }}
                          src={avatar}
                          alt=""
                        />
                        <img
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                          src={avatar}
                          alt=""
                        />
                      </div>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">Reporter</p>
                      <p className="mb-0 f12">Jan Smith</p>
                    </li>
                  </ul>
                </div>
                <div className="px-2 py-1">
                  <button
                    onClick={() => setRegister(true)}
                    className="border-0 bg-transparent d-flex gap-1 align-items-center"
                  >
                    <img src={deleteI} alt="" />
                    Remove ticket
                  </button>
                </div>
              </div>
              <div className="report_container mt-4 py-3">
                <ul className="d-flex flex-column gap-3 mb-0 pe-3">
                  <li className="completed d-flex justify-content-between align-items-center">
                    <p className="mb-0 f14">Created</p>
                    <p className="mb-0 f12">21-01-2023 - 14:32 uur</p>
                  </li>
                  <li className="completed d-flex justify-content-between align-items-center">
                    <p className="mb-0 f14">Updated</p>
                    <p className="mb-0 f12">21-01-2023 - 14:32 uur</p>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 f14">Resolved</p>
                    <p className="mb-0 f14"></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
