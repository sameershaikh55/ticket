import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input2 from "./Input2";
import Textarea from "./Textarea";
import lock from "../assets/icons/lock.svg";
import UploadInout from "./UploadInput";
import share from "../assets/icons/share.svg";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SmallLoader from "./SmallLoader";
import {
  clearErrors,
  registerManager,
  updateManager,
} from "../redux/action/admin/managers";
import {
  ADD_MANAGER_RESET,
  UPDATE_MANAGER_RESET,
} from "../redux/type/admin/managers";
import { validateFields } from "../utils/validateFields";
import { uploadImage } from "../utils/uploadImage";

const ManagerForm = ({ register, setRegister, editData, setEditData, id }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { managerLoading, managerError, success } = useSelector(
    (state) => state.manager
  );

  const [inputHandle, setInputHandle] = useState({
    name: "",
    phone: "",
    picture: "",
    email: "",
    password: "",
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
      label: "Phone",
      type: "text",
      placeholder: "Enter Phone",
      name: "phone",
      class: "col-6",
    },
    {
      label: "Picture",
      type: "file",
      placeholder: "Upload Picture",
      name: "picture",
      class: "col-12",
      icon: share,
    },
    {
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      name: "email",
      class: "col-12",
    },
    {
      label: "Password",
      type: "text",
      placeholder: "Enter Password",
      name: "password",
      icon: lock,
      class: "col-12",
    },
  ];

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      uploadImage({
        file: e.target.files[0],
        fieldName: "picture",
        storageFolder: "managers",
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
        updateManager(
          {
            ...inputHandle,
          },
          editData.id
        )
      );
    } else {
      dispatch(
        registerManager({
          ...inputHandle,
          client: id,
          createdAt: new Date().toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    if (managerError) {
      alert.error(managerError);
      dispatch(clearErrors());
    }

    if (success) {
      if (editData) {
        alert.success("Manager edited!");
        dispatch({ type: UPDATE_MANAGER_RESET });
      } else {
        alert.success("Manager created!");
        dispatch({ type: ADD_MANAGER_RESET });
      }

      setEditData(null);
      setRegister(false);
      setInputHandle({
        name: "",
        phone: "",
        picture: "",
        email: "",
        password: "",
      });
    }
  }, [dispatch, alert, success, managerError]);

  useEffect(() => {
    if (editData) {
      const { name, phone, picture, email, password } = editData;
      setInputHandle({
        name,
        phone,
        picture,
        email,
        password,
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
                      {(content.type === "textarea" && (
                        <Textarea
                          {...content}
                          value={inputHandle[content.name]}
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
                      !managerLoading && inputHandle.picture !== "loading..."
                        ? false
                        : true
                    }
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    {(managerLoading && <SmallLoader />) || (
                      <div>
                        {(editData && "Edit") || "Create"} Project Manager
                      </div>
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

export default ManagerForm;
