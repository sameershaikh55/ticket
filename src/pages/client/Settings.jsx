import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import mailPhone from "../../assets/icons/mailPhone.svg";
import mailPhoneD from "../../assets/icons/mailPhoneD.svg";
import star from "../../assets/icons/mode/star.svg";
import sun from "../../assets/icons/mode/sun.svg";
import { dark, light } from "../../redux/action/mode";
import { logout } from "../../redux/action/admin/auth";
import Loader from "../../components/Loader";
import { useGetManagers } from "../../utils/hooks/useGetManagers";
import { getManager } from "../../redux/action/admin/managers";

const Settings = () => {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.manager);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!Object.keys(user).length) {
      dispatch(logout());
    } else {
      dispatch(getManager());
    }
  }, []);

  const managers = useGetManagers(user.id);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="settings_container">
      <div className="inner_settings_container">
        <div className="container-fluid">
          <div className="column_container d-flex flex-column justify-content-between align-items-center gap-4">
            <div className="w-100">
              <h3 className="color9 fw400 text-uppercase">Project leaders</h3>
              <div className="line mt-2 mb-3" />
              {managers.map((content, i) => {
                const { name, email, phone } = content;
                return (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <img src={avatar} alt="" />
                    <p className="color9 mb-0 f14">
                      <span className="pe-2">{name}</span>|
                      <span className="px-2">{email}</span>|
                      <span className="px-2">{phone}</span>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-100 row gy-4">
              <div className="col-12 col-md-6">
                <h4 className="color9 fw400 text-uppercase">SLA</h4>
                <div className="line mt-2 mb-3" />

                <div className="d-flex flex-column gap-3">
                  <div className="color9 f15">
                    {user.sla}

                    {/* Respond within
                    <span className="time_bg rounded-1 p-1 ms-2 text-dark">
                      24 Hours
                    </span> */}
                  </div>
                  {/* <div className="color9 f15">
                    Looptijd
                    <span className="time_bg rounded-1 p-1 ms-2 text-dark">
                      1 jaar
                    </span>
                  </div> */}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="color9 fw400 text-uppercase">Systems</h4>
                <div className="line mt-2 mb-3" />
                <div className="color9">{user.systems}</div>

                {/* <ul className="list-unstyled color9 f15">
                  <li>
                    <strong className="me-2">Template:</strong>
                    Avada
                  </li>
                  <li>
                    <strong className="me-2">PHP versie:</strong>
                    7.4.1
                  </li>
                  <li>
                    <strong className="me-2">Server:</strong>
                    Faktor 22
                  </li>
                  <li>
                    <strong className="me-2">OS:</strong>
                    Ubuntu 16.04.7 LTS
                  </li>
                  <li>
                    <strong className="me-2">RAM:</strong>4 GB
                  </li>
                  <li>
                    <strong className="me-2">VM:</strong>
                    Linux-based
                  </li>
                  <li>
                    <strong className="me-2">GIT:</strong>
                    N.v.t.
                  </li>
                  <li>
                    <strong className="me-2">SSL / LetsEncrypt:</strong>
                    Cloudflare, Inc.
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="w-100 pb-2">
              <h4 className="color9 fw400 text-uppercase">Settings</h4>
              <div className="line mt-2 mb-3" />
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-between">
                <div className="mode d-flex">
                  <button
                    onClick={() => dispatch(dark())}
                    className={`${mode === "dark" && "active_1"}`}
                  >
                    <img src={star} alt="" />
                  </button>
                  <button
                    onClick={() => dispatch(light())}
                    className={`${mode === "light" && "active_2"}`}
                  >
                    <img src={sun} alt="" />
                  </button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {(mode === "dark" && <img src={mailPhone} alt="" />) || (
                    <img src={mailPhoneD} alt="" />
                  )}
                  <p className="mb-0 color9">
                    info@faktor22.nl
                    <span className="px-3">//</span>
                    +31 24 202 2190
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
