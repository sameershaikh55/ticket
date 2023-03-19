import React, { useState } from "react";
import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import add from "../../assets/icons/add.svg";
import Input2 from "../../components/Input2";
import share from "../../assets/icons/share.svg";
import SelectBox from "../../components/SelectBox";

const Dashboard = () => {
  const [register, setRegister] = useState(false);

  const todo = [];
  const inProgess = [];
  const done = [];

  const [addTicketHandle, setAddTicketHandle] = useState({
    subject: "",
    problem: "",
    type: "Issue",
    priority: "Low",
    screenshot: "",
    explanation: "",
  });

  const fields = [
    {
      label: "Subject",
      type: "text",
      placeholder: "E.g. Database update server #1",
      name: "subject",
      class: "col-12",
    },
    {
      label: "Where’s the problem? (url)",
      type: "text",
      name: "problem",
      class: "col-12",
      placeholder: "E.g. https://google.nl/",
    },
    {
      label: "Type",
      type: "checkbox",
      name: "type",
      class: "col-6",
      options: [
        {
          value: "Issue",
          html: <>Issue</>,
        },
        {
          value: "Question",
          html: <>Question</>,
        },
      ],
    },
    {
      label: "Priority",
      type: "checkbox",
      name: "priority",
      class: "col-6",
      options: [
        {
          value: "Low",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="yellow"></div>Low
            </div>
          ),
        },
        {
          value: "Medium",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="orange"></div>Medium
            </div>
          ),
        },
        {
          value: "High",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="red"></div>High
            </div>
          ),
        },
      ],
    },
    {
      label: "Screenshot",
      type: "text",
      name: "screenshot",
      class: "col-12",
      placeholder: "Screenshot",
      icon: share,
    },
    {
      label: "Explanation",
      type: "text",
      name: "explanation",
      class: "col-12",
      placeholder: "Briefly state what it is about",
    },
  ];

  const handleChange = (e) => {
    setAddTicketHandle({
      ...addTicketHandle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="dashboard_container">
      <div className="container-fluid">
        {register && (
          <Modal register={register} setRegister={setRegister}>
            <form className="form_container pt-4">
              <div className="container-fluid">
                <div className="row gy-4">
                  {fields.map((content, idx) => {
                    return (
                      <div key={idx} className={content.class}>
                        {(content.type === "checkbox" && (
                          <SelectBox
                            {...content}
                            state={addTicketHandle[content.name]}
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
                      Create client
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        )}
        <div className="row gy-3">
          <div className="col-12 col-md-4">
            <div className="task_container">
              <h6 className="text-uppercase">TO DO</h6>

              <div className="inner_container one">
                {[1, 1, 1, 1, 1, 1].map((content, i) => {
                  return (
                    <div key={i}>
                      <TaskCard />
                    </div>
                  );
                })}
              </div>

              <div className="todo_actions">
                <button onClick={() => setRegister(true)}>
                  <img src={add} alt="" />
                  Create ticket
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="task_container">
              <h6 className="text-uppercase">In Progress</h6>

              <div className="inner_container">
                {[1, 1, 1].map((content, i) => {
                  return (
                    <div key={i}>
                      <TaskCard />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="task_container">
              <h6 className="text-uppercase">DONE</h6>

              <div className="inner_container">
                {[1, 1, 1, 1].map((content, i) => {
                  return (
                    <div key={i}>
                      <TaskCard />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
