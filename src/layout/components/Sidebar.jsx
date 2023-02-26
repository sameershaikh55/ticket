import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo2 from "../../assets/logo2.svg";
import i1 from "../../assets/sidebar/i1.svg";
import i2 from "../../assets/sidebar/i2.svg";
import i3 from "../../assets/sidebar/i3.svg";
import Di1 from "../../assets/sidebarDark/i1.svg";
import Di2 from "../../assets/sidebarDark/i2.svg";
import Di3 from "../../assets/sidebarDark/i3.svg";

const Sidebar = () => {
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

  return (
    <div className="sidebar_container d-flex flex-column justify-content-between align-items-center">
      <div>
        <img src={logo2} alt="" />
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
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ width: "35px", height: "35px" }}
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
