import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input2 from "./Input2";
import UploadInout from "./UploadInput";
import share from "../assets/icons/share.svg";
import { clearErrors, registerTeam } from "../redux/action/admin/team";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ADD_TEAM_RESET, UPDATE_TEAM_RESET } from "../redux/type/admin/team";
import SmallLoader from "./SmallLoader";

const TeamForm = ({ register, setRegister, editData, setEditData }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { teamLoading, teamError, success } = useSelector(
    (state) => state.team
  );

  const [addTicketHandle, setAddTicketHandle] = useState({
    name: "",
    email: "",
    picture: "",
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
      label: "Picture",
      type: "file",
      name: "picture",
      class: "col-12",
      placeholder: "Picture",
      icon: share,
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

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      registerTeam({
        ...addTicketHandle,
        projects: "kpn-1, kpn-2",
        picture:
          "https://firebasestorage.googleapis.com/v0/b/ticket-8d484.appspot.com/o/images.jpg?alt=media&token=d1d0efeb-adf0-40c7-9f80-fc3e54b04c5b",
        createdAt: new Date().toISOString(),
      })
    );
  };

  useEffect(() => {
    if (teamError) {
      alert.error(teamError);
      dispatch(clearErrors());
    }

    if (success) {
      if (editData) {
        alert.success("Member edited!");
        dispatch({ type: UPDATE_TEAM_RESET });
      } else {
        alert.success("Member created!");
        dispatch({ type: ADD_TEAM_RESET });
      }

      setEditData(null);
      setRegister(false);
      setAddTicketHandle({
        name: "",
        email: "",
        picture: "",
        projects: "",
      });
    }
  }, [dispatch, alert, success, teamError]);

  useEffect(() => {
    if (editData) {
      const { name, email, picture, projects } = editData;
      setAddTicketHandle({
        name,
        email,
        picture,
        projects,
      });
    }
  }, [editData]);

  return (
    <>
      {register && (
        <Modal register={register} setRegister={setRegister}>
          <form onSubmit={submit} className="form_container pt-4">
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
                                <div
                                  key={i}
                                  className="d-flex align-items-center gap-2"
                                >
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
                      )) ||
                        (content.type === "file" && (
                          <UploadInout
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
                    disabled={(teamLoading && true) || false}
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    {(teamLoading && <SmallLoader />) || "Add team member"}
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

export default TeamForm;
