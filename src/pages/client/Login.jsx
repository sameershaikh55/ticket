import React from "react";
import login from "../../assets/login.png";
import Input from "../../components/Input";
import lock from "../../assets/icons/lock.svg";
import logo from "../../assets/logo.svg";

const Login = () => {
  return (
    <div className="login_container">
      <div className="login-left">
        <form className="inner-left d-flex flex-column">
          <div>
            <img src={logo} alt="" />
          </div>

          <div className="d-flex flex-column">
            <Input label="Username" name="email" />
            <Input label="Password" icon={lock} name="password" />

            <div className="d-flex flex-column">
              <button
                type="submit"
                className="rounded-1 btn-lg bg_color2 border-0 f18 w-100 text-center text-white py-2"
              >
                Login
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
        <img src={login} alt="" />
      </div>
    </div>
  );
};

export default Login;
