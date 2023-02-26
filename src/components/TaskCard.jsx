import React from "react";
import { useNavigate } from "react-router-dom";
import threeDots from "../assets/icons/threeDots.svg";

const TaskCard = ({ i }) => {
  const navigate = useNavigate();

  return (
    <div className="task_card_container pointer">
      <div className="card-data">
        <h6 onClick={() => navigate("/ticket")}>
          Website database update database update
        </h6>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id={`myCheckbox${i}`}
              name={`myCheckbox${i}`}
            />
            <label htmlFor={`myCheckbox${i}`}>KPN-1</label>
          </div>
          <ul className="list-unstyled d-flex gap-2 mb-0">
            <li>Question</li>
            <li>High</li>
          </ul>
        </div>
      </div>
      <div className="actions">
        <p>Created: 21-01-2023 - 14:32 uur</p>
        <button>
          <img src={threeDots} alt="" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
