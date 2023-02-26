import React, { useState } from "react";
import cross from "../../assets/icons/crossW.svg";
import TeamCard from "../../components/TeamCard";
import Modal from "../../components/Modal";
import Input2 from "../../components/Input2";
import share from "../../assets/icons/share.svg";
import Textarea from "../../components/Textarea";

const Teams = () => {
  const [register, setRegister] = useState(false);
  const [addTicketHandle, setAddTicketHandle] = useState({
    name: "",
    email: "",
    projects: "",
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
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      name: "email",
      class: "col-6",
    },
    {
      label: "Projects",
      type: "checks",
      name: "projects",
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
    <div className="admin_clients_container">
      {register && (
        <Modal register={register} setRegister={setRegister}>
          <form className="form_container pt-4">
            <div className="container-fluid">
              <div className="row gy-3">
                {fields.map((content, idx) => {
                  return (
                    <div key={idx} className={content.class}>
                      {(content.type === "checks" && (
                        <div className="checks">
                          <label className="main" htmlFor="">
                            {content.label}
                          </label>

                          <div className="check">
                            {[1, 1, 1].map((_, i) => {
                              return (
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`myCheckbox${i}`}
                                    name={`myCheckbox${i}`}
                                  />
                                  <label htmlFor={`myCheckbox${i}`}>
                                    KPN-1
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
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
                    Add team member
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}

      <div className="container-fluid">
        <div className="inner_admin_clients_container">
          <div className="d-flex justify-content-between">
            <h5 className="fw400">TEAM</h5>
            <button
              onClick={() => setRegister(true)}
              className="bg-transparent border-0"
            >
              <img src={cross} alt="" />
            </button>
          </div>

          <div className="clients_container mt-3">
            {[1, 1, 1].map(() => {
              return <TeamCard />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
