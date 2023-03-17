import React, { useState, useEffect } from "react";
import Textarea from "./Textarea";
import Modal from "./Modal";
import Input2 from "./Input2";
import UploadInout from "./UploadInput";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import share from "../assets/icons/share.svg";
import SmallLoader from "./SmallLoader";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  updateClient,
  registerClient,
  clearErrors,
} from "../redux/action/admin/clients";
import {
  ADD_CLIENT_RESET,
  UPDATE_CLIENT_RESET,
} from "../redux/type/admin/clients";

const ClientForm = ({ register, setRegister, editData, setEditData }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { clientLoading, clientError, success } = useSelector(
    (state) => state.client
  );

  const [inputHandle, setInputHandle] = useState({
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
      placeholder: "Enter Name",
      name: "name",
      class: "col-6",
    },
    {
      label: "Shortcode",
      type: "text",
      placeholder: "Enter Shortcode",
      name: "shortcode",
      class: "col-6",
    },
    {
      label: "Logo",
      type: "file",
      name: "logo",
      class: "col-12",
      placeholder: "Upload Logo",
      icon: share,
    },
    {
      label: "SLA",
      type: "textarea",
      name: "sla",
      class: "col-12",
      placeholder: "Enter SLA",
      row: 2,
    },
    {
      label: "Systems",
      type: "textarea",
      name: "systems",
      class: "col-12",
      placeholder: "Enter Systems",
      row: 5,
    },
  ];

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      uploadFiles(e.target.files[0]);
    } else {
      setInputHandle({
        ...inputHandle,
        [e.target.name]: e.target.value,
      });
    }
  };

  // IMAGE UPLOAD TO FIREBASE
  const uploadFiles = (file) => {
    setInputHandle({
      ...inputHandle,
      logo: "loading...",
    });

    if (!file) {
      setInputHandle({
        ...inputHandle,
        logo: "file not found",
      });
      return;
    }

    const storageRef = ref(storage, `client/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputHandle({
            ...inputHandle,
            logo: downloadURL,
          });
        });
      }
    );
  };

  const submit = (e) => {
    e.preventDefault();

    if (editData) {
      dispatch(
        updateClient(
          {
            ...inputHandle,
          },
          editData.id
        )
      );
    } else {
      dispatch(
        registerClient({
          ...inputHandle,
          createdAt: new Date().toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    if (clientError) {
      alert.error(clientError);
      dispatch(clearErrors());
    }

    if (success) {
      if (editData) {
        alert.success("Member edited!");
        dispatch({ type: UPDATE_CLIENT_RESET });
      } else {
        alert.success("Member created!");
        dispatch({ type: ADD_CLIENT_RESET });
      }

      setEditData(null);
      setRegister(false);
      setInputHandle({
        name: "",
        shortcode: "",
        logo: "",
        sla: "",
        systems: "",
      });
    }
  }, [dispatch, alert, success, clientError]);

  useEffect(() => {
    if (editData) {
      const { name, shortcode, logo, sla, systems } = editData;
      setInputHandle({
        name,
        shortcode,
        logo,
        sla,
        systems,
      });
    }
  }, [editData]);

  console.log(inputHandle);

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
                    disabled={(clientLoading && true) || false}
                    type="submit"
                    className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
                  >
                    {(clientLoading && <SmallLoader />) || (
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

export default ClientForm;
