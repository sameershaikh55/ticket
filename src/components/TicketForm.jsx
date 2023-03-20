import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input2 from "./Input2";
import share from "../assets/icons/share.svg";
import SelectBox from "./SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { uploadImage } from "../utils/uploadImage";
import UploadInout from "./UploadInput";
import { validateFields } from "../utils/validateFields";
import {
  clearErrors,
  registerTicket,
  updateTicket,
} from "../redux/action/client/ticket";
import {
  ADD_TICKET_RESET,
  UPDATE_TICKET_RESET,
} from "../redux/type/client/ticket";
import SmallLoader from "./SmallLoader";

const TicketForm = ({ register, setRegister, editData, setEditData }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { ticketLoading, ticketError, success } = useSelector(
    (state) => state.ticket
  );

  const [inputHandle, setInputHandle] = useState({
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
      type: "file",
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
    if (e.target.name === "screenshot") {
      uploadImage({
        file: e.target.files[0],
        fieldName: "screenshot",
        storageFolder: "ticket",
        inputHandle,
        setInputHandle,
      });
    } else {
      setInputHandle({
        ...inputHandle,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const errors = validateFields(inputHandle);
    const client = JSON.parse(localStorage.getItem("user"));

    if (Object.keys(errors).length !== 0) {
      alert.error(errors.join(", "));
      return;
    }

    if (editData) {
      dispatch(
        updateTicket(
          {
            ...inputHandle,
            status: editData.status,
            createdAt: editData.createdAt,
          },
          editData.id
        )
      );
    } else {
      dispatch(
        registerTicket({
          ...inputHandle,
          client: client.id,
          status: "todo",
          createdAt: new Date().toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    if (ticketError) {
      alert.error(ticketError);
      dispatch(clearErrors());
    }

    if (success) {
      if (editData) {
        alert.success("Ticket edited!");
        dispatch({ type: UPDATE_TICKET_RESET });
      } else {
        alert.success("Ticket created!");
        dispatch({ type: ADD_TICKET_RESET });
      }

      setEditData(null);
      setRegister(false);
      setInputHandle({
        subject: "",
        problem: "",
        type: "Issue",
        priority: "Low",
        screenshot: "",
        explanation: "",
      });
    }
  }, [dispatch, alert, success, ticketError]);

  useEffect(() => {
    if (editData) {
      const { subject, problem, type, priority, screenshot, explanation } =
        editData;
      setInputHandle({
        subject,
        problem,
        type,
        priority,
        screenshot,
        explanation,
      });
    }
  }, [editData]);

  return (
    <>
      {register && (
        <Modal register={register} setRegister={setRegister}>
          <form onSubmit={submit} className="form_container pt-4">
            <div className="container-fluid">
              <div className="row gy-4">
                {fields.map((content, idx) => {
                  return (
                    <div key={idx} className={content.class}>
                      {(content.type === "checkbox" && (
                        <SelectBox
                          {...content}
                          state={inputHandle[content.name]}
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
                    disabled={
                      !ticketLoading && inputHandle.picture !== "loading..."
                        ? false
                        : true
                    }
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    {(ticketLoading && <SmallLoader />) || (
                      <div>{(editData && "Edit") || "Create"} ticket</div>
                    )}
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

export default TicketForm;
