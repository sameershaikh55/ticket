import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import i1 from "../../assets/sidebar/i1.svg";
import i2 from "../../assets/sidebar/i2.svg";
import i3 from "../../assets/sidebar/i3.svg";
import Di1 from "../../assets/sidebarDark/i1.svg";
import Di2 from "../../assets/sidebarDark/i2.svg";
import Di3 from "../../assets/sidebarDark/i3.svg";
import Loader from "../../components/Loader";
import { logout } from "../../redux/action/admin/auth";
import { getClient } from "../../redux/action/admin/clients";

const Sidebar = () => {
  const [showClients, setShowClients] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const location = useLocation();
  const links = [
    {
      link: "/",
      icon: (mode === "dark" && i1) || Di1,
    },
    {
      link: "/settings",
      icon: (mode === "dark" && i2) || Di2,
    },
  ];

  const { clients, loading } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClient());
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="sidebar_container d-flex flex-column justify-content-between align-items-center">
      <div className="d-flex flex-column gap-3">
        <img
          onClick={() => {
            if (auth?.projects) {
              setShowClients(!showClients);
            }
          }}
          className={`logo ${(auth?.projects && "pointer") || ""}`}
          src={user.logo}
          alt=""
        />

        {(showClients &&
          clients.map((content, i) => {
            if (content.id === user.id) {
              return;
            }

            if (!auth.projects.includes(content.name)) {
              return;
            }

            return (
              <img
                onClick={() => {
                  localStorage.setItem("user", JSON.stringify({ ...content }));
                  window.location.reload();
                }}
                key={i}
                className="pointer logo"
                src={content.logo}
                alt=""
              />
            );
          })) ||
          ""}
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center gap-5">
        <ul className="list-unstyled d-flex flex-column gap-4">
          {links.map(({ icon, link }, i) => {
            const icons = [i1, i2];

            return (
              <li
                key={i}
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  background: (location.pathname === link && "#4F8DF2") || "",
                  width: "35px",
                  height: "35px",
                }}
              >
                <Link to={link}>
                  {mode === "dark" ? (
                    <img src={icon} alt="" />
                  ) : (
                    (location.pathname === link && (
                      <img src={icons[i]} alt="" />
                    )) || <img src={icon} alt="" />
                  )}
                </Link>
              </li>
            );
          })}
          <li
            className="d-flex justify-content-center align-items-center rounded-circle pointer"
            style={{ width: "35px", height: "35px" }}
            onClick={() => dispatch(logout())}
          >
            {(mode === "dark" && <img src={i3} alt="" />) || (
              <img src={Di3} alt="" />
            )}
          </li>
        </ul>

        <div>
          <p className="text-white f14 mb-0 text-center">V.1.3</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
