import React, { useState } from "react";
import logo from "../assets/logo2.svg";
import avatar from "../assets/avatar.png";
import add from "../assets/icons/cross.svg";
import edit from "../assets/icons/edit.svg";
import deleteI from "../assets/icons/delete.svg";
import Modal from "./Modal";
import Input2 from "./Input2";
import Textarea from "./Textarea";

const ClientCard = () => {
  const [register, setRegister] = useState(false);
  const [addTicketHandle, setAddTicketHandle] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const fields = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter Name",
      name: "name",
      class: "col-6",
    },
    {
      label: "Phone",
      type: "text",
      placeholder: "Enter Phone",
      name: "phone",
      class: "col-6",
    },
    {
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      name: "email",
      class: "col-12",
    },
  ];

  const handleChange = (e) => {
    setAddTicketHandle({
      ...addTicketHandle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="client_card gap-3">
      {register && (
        <Modal register={register} setRegister={setRegister}>
          <form className="form_container pt-4">
            <div className="container-fluid">
              <div className="row gy-3">
                {fields.map((content, idx) => {
                  return (
                    <div key={idx} className={content.class}>
                      {(content.type === "textarea" && (
                        <Textarea
                          {...content}
                          value={addTicketHandle[content.name]}
                          onChange={(e) => handleChange(e)}
                        />
                      )) || (
                        <Input2
                          {...content}
                          value={addTicketHandle[content.name]}
                          onChange={(e) => handleChange(e)}
                        />
                      )}
                    </div>
                  );
                })}

                <div className="col-12">
                  <button
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    Create Project Manager
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}

      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo" src={logo} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input
              className="w-100 px-2"
              type="text"
              value="KPN Nederland"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="KPN"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="01-01-2023"
              name=""
              id=""
              readOnly
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <img style={{ width: "18px" }} src={edit} alt="" />
          <img style={{ width: "18px" }} src={deleteI} alt="" />
        </div>
      </div>
      <div className="d-flex justify-content-between w-100 gap-3">
        <div className="d-flex align-items-center gap-3 w-100">
          <img className="logo" src={avatar} alt="" />
          <div className="d-flex align-items-center w-100 gap-3">
            <input
              className="w-100 px-2"
              type="text"
              value="KPN Nederland"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="KPN"
              name=""
              id=""
              readOnly
            />
            <input
              className="w-100 px-2"
              type="text"
              value="01-01-2023"
              name=""
              id=""
              readOnly
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <img style={{ width: "18px" }} src={edit} alt="" />
          <img style={{ width: "18px" }} src={deleteI} alt="" />
        </div>
      </div>
      <div>
        <button
          onClick={() => setRegister(true)}
          className="d-flex align-items-center gap-2 bg-transparent border-0 fw500"
        >
          <img style={{ width: "18px" }} src={add} alt="" />
          Add Project Manager
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
