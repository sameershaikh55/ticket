import React from "react";
import { useNavigate } from "react-router-dom";
import threeDots from "../assets/icons/threeDots.svg";

const TaskCard = ({
  type,
  priority,
  subject,
  createdAt,
  setEditData,
  setRegister,
  ...content
}) => {
  const navigate = useNavigate();

  const originalDate = new Date(createdAt);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  const originalTime = new Date(createdAt);
  const hour = originalTime.getHours() + 1;
  const minutes = originalTime.getMinutes() + 1;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="task_card_container pointer">
      <div className="card-data">
        <h6 onClick={() => navigate("/ticket")}>{subject}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id={`myCheckbox`}
              name={`myCheckbox`}
              checked
              readOnly
            />
            <label htmlFor={`myCheckbox`}>{user.name}</label>
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
        <p>
          Created: {formattedDate} - {hour}:{minutes} uur
        </p>
        <button
          onClick={() => {
            setEditData({
              type,
              priority,
              subject,
              createdAt,
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
