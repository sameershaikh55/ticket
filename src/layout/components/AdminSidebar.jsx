import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import adminIcon from "../../assets/adminIcon.svg";
import i1 from "../../assets/adminSidebar/i1.svg";
import i2 from "../../assets/adminSidebar/i2.svg";
import i3 from "../../assets/sidebar/i3.svg";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    {
      link: "/admin/clients",
      icon: i1,
    },
    {
      link: "/admin/team",
      icon: i2,
    },
  ];

  return (
    <div className="sidebar_container d-flex flex-column justify-content-between align-items-center">
      <div className="d-flex flex-column justify-content-between align-items-center gap-5">
        <div>
          <img style={{ marginTop: "-10px" }} src={adminIcon} alt="" />
        </div>

        <ul className="list-unstyled d-flex flex-column gap-4">
          {links.map(({ icon, link }, i) => {
            return (
              <li
                key={i}
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  background: (location.pathname === link && "#4F8DF2") || "",
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to={link}>
                  <img src={icon} alt="" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center gap-5">
        <ul className="list-unstyled d-flex flex-column gap-4">
          <li
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ width: "35px", height: "35px" }}
          >
            <img src={i3} alt="" />
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
