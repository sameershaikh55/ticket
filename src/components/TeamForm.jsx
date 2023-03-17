import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input2 from "./Input2";
import UploadInout from "./UploadInput";
import share from "../assets/icons/share.svg";
import {
  clearErrors,
  registerTeam,
  updateTeam,
} from "../redux/action/admin/team";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ADD_TEAM_RESET, UPDATE_TEAM_RESET } from "../redux/type/admin/team";
import SmallLoader from "./SmallLoader";
import { validateFields } from "../utils/validateFields";
import { uploadImage } from "../utils/uploadImage";

const TeamForm = ({ register, setRegister, editData, setEditData }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { teamLoading, teamError, success } = useSelector(
    (state) => state.team
  );

  const [inputHandle, setInputHandle] = useState({
    name: "",
    email: "",
    picture: "",
    // projects: "",
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
    if (e.target.name === "picture") {
      uploadImage({
        file: e.target.files[0],
        fieldName: "picture",
        storageFolder: "team",
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

    if (Object.keys(errors).length !== 0) {
      alert.error(errors.join(", "));
      return;
    }

    if (editData) {
      dispatch(
        updateTeam(
          {
            ...inputHandle,
            projects: "kpn-1, kpn-2",
          },
          editData.id
        )
      );
    } else {
      dispatch(
        registerTeam({
          ...inputHandle,
          projects: "kpn-1, kpn-2",
          createdAt: new Date().toISOString(),
        })
      );
    }
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
      setInputHandle({
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
      setInputHandle({
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
                      !teamLoading && inputHandle.picture !== "loading..."
                        ? false
                        : true
                    }
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    {(teamLoading && <SmallLoader />) || (
                      <div>{(editData && "Edit") || "Add"} team member</div>
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

export default TeamForm;
