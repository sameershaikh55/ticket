import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SelectBox2 from "./Selectbox2";
import { updateTicket, clearErrors } from "../redux/action/client/ticket";
import { UPDATE_TICKET_RESET } from "../redux/type/client/ticket";

const DetailForm = ({ singleTicket }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { ticketError, success } = useSelector((state) => state.ticket);

  const [inputHandle, setInputHandle] = useState({
    priority: "Low",
    type: "Issue",
    status: "todo",
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
          value: "todo",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="cream"></div>To Do
            </div>
          ),
          bg: "#facea0",
        },
        {
          value: "progress",
          html: (
            <div className="d-flex align-items-center gap-2">
              <div className="blue"></div>In Progress
            </div>
          ),
          bg: "#4f8df2",
        },
        {
          value: "done",
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
    const { name, value } = e.target;

    dispatch(
      updateTicket(
        {
          [name]: value,
          updatedAt: new Date().toISOString(),
          resolvedAt: value === "done" ? new Date().toISOString() : null,
        },
        id
      )
    );

    setInputHandle({
      ...inputHandle,
      [name]: value,
    });
  };

  useEffect(() => {
    const { status, type, priority } = singleTicket;

    setInputHandle({
      status: status,
      type: type,
      priority: priority,
    });
  }, [id, singleTicket]);

  useEffect(() => {
    if (ticketError) {
      alert.error(ticketError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Ticket edited!");
      dispatch({ type: UPDATE_TICKET_RESET });
    }
  }, [dispatch, alert, success, ticketError]);

  return (
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
                state={inputHandle[content.name]}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DetailForm;
