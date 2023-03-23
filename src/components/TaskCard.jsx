import React from "react";
import { useNavigate } from "react-router-dom";
import threeDots from "../assets/icons/threeDots.svg";
import { getDateTime } from "../utils/getDateTime";

const TaskCard = ({
  type,
  priority,
  subject,
  createdAt,
  setEditData,
  setRegister,
  id,
  status,
  ...content
}) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="task_card_container pointer">
      <div className="card-data">
        <h6 onClick={() => navigate(`/ticket/${id}`)}>{subject}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id={`myCheckbox`}
              name={`myCheckbox`}
              checked
              readOnly
              className={`${(status === "done" && "green") || ""}`}
            />
            <label
              className={`${(status === "done" && "greenlabel") || ""}`}
              htmlFor={`myCheckbox`}
            >
              {user.name}
            </label>
          </div>
          <ul className="list-unstyled d-flex gap-2 mb-0">
            <li>{type}</li>
            <li
              className={`${
                (priority === "Low" && "yellow text-dark") ||
                (priority === "Medium" && "orange") ||
                (priority === "High" && "red")
              }`}
            >
              {priority}
            </li>
          </ul>
        </div>
      </div>
      <div className="actions">
        <p>Created: {getDateTime(createdAt)}</p>
        <button
          onClick={() => {
            setEditData({
              type,
              priority,
              subject,
              createdAt,
              status,
              ...content,
            });
            setRegister(true);
          }}
        >
          <img src={threeDots} alt="" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
