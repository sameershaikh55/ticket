import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login } from "../../redux/action/admin/auth";

import loginPng from "../../assets/login.png";
import Input from "../../components/Input";
import lock from "../../assets/icons/lock.svg";
import logo from "../../assets/logo.svg";
import SmallLoader from "../../components/SmallLoader";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.adminUser
  );
  const [inputHandle, setInputHandle] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputHandle({ ...inputHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(login(inputHandle.email, inputHandle.password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Login successfully");
    }
  }, [dispatch, alert, error, isAuthenticated]);

  return (
    <div className="login_container">
      <div className="login-left">
        <form className="inner-left d-flex flex-column">
          <div>
            <img src={logo} alt="" />
          </div>

          <div className="d-flex flex-column">
            <Input
              label="Email"
              name="email"
              value={inputHandle.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              icon={lock}
              name="password"
              value={inputHandle.password}
              onChange={handleChange}
            />

            <div className="d-flex flex-column">
              <button
                disabled={loading ? true : false}
                onClick={submit}
                className="rounded-1 btn-lg bg_color2 border-0 f18 w-100 text-center text-white py-2"
              >
                {loading ? <SmallLoader /> : "Login"}
              </button>
            </div>
          </div>

          <p className="text-white f14">
            v.1.1 Faktor 22 - All rights reserved
          </p>
        </form>
      </div>
      <div className="login-right">
        <h1 className="display-4 fw-bolder">
          No Task is too easy or too hard.
        </h1>
        <img src={loginPng} alt="" />
      </div>
    </div>
  );
};

export default Login;
