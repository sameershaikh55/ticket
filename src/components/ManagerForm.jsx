import React, { useState } from "react";
import Modal from "./Modal";
import Input2 from "./Input2";
import Textarea from "./Textarea";
import lock from "../assets/icons/lock.svg";
import UploadInout from "./UploadInput";
import share from "../assets/icons/share.svg";

const ManagerForm = ({ register, setRegister, editData, setEditData }) => {
  const [inputHandle, setInputHandle] = useState({
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
      label: "Picture",
      type: "file",
      placeholder: "Upload Picture",
      name: "picture",
      class: "col-12",
      icon: share,
    },
    {
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      name: "email",
      class: "col-12",
    },
    {
      label: "Password",
      type: "text",
      placeholder: "Enter Password",
      name: "password",
      icon: lock,
      class: "col-12",
    },
  ];

  const handleChange = (e) => {
    setInputHandle({
      ...inputHandle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
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
                          value={inputHandle[content.name]}
                          onChange={(e) => handleChange(e)}
                        />
                      )) ||
                        (content.type === "file" && (
                          <UploadInout
                            {...content}
                            value={inputHandle[content.name]}
                            onChange={(e) => handleChange(e)}
                          />
                        )) || (
                          <Input2
                            {...content}
                            value={inputHandle[content.name]}
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
    </>
  );
};

export default ManagerForm;
