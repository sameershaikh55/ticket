import React, { useState } from "react";
import cross from "../../assets/icons/crossW.svg";
import ClientCard from "../../components/ClientCard";
import Modal from "../../components/Modal";
import Input2 from "../../components/Input2";
import share from "../../assets/icons/share.svg";
import Textarea from "../../components/Textarea";

const Client = () => {
  const [register, setRegister] = useState(false);
  const [addTicketHandle, setAddTicketHandle] = useState({
    name: "",
    shortcode: "",
    logo: "",
    sla: "",
    systems: "",
  });
  const fields = [
    {
      label: "Name",
      type: "text",
      placeholder: "KPN Nederland",
      name: "name",
      class: "col-6",
    },
    {
      label: "Shortcode",
      type: "text",
      placeholder: "KPN",
      name: "shortcode",
      class: "col-6",
    },
    {
      label: "Logo",
      type: "text",
      name: "logo",
      class: "col-12",
      placeholder: "Logo",
      icon: share,
    },
    {
      label: "SLA",
      type: "textarea",
      name: "sla",
      class: "col-12",
      placeholder: "SLA",
      row: 2,
    },
    {
      label: "Systems",
      type: "textarea",
      name: "systems",
      class: "col-12",
      placeholder: "Systems",
      row: 5,
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
                    Create ticket
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
            <h5 className="fw400">CLIENTS</h5>
            <button
              onClick={() => setRegister(true)}
              className="bg-transparent border-0"
            >
              <img src={cross} alt="" />
            </button>
          </div>

          <div className="clients_container mt-3">
            {[1, 1, 1].map(() => {
              return <ClientCard />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
