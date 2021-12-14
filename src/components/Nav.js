import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { NavData } from "./Nav.data";
import { IconContext } from "react-icons";

export default function Nav() {
  const [sidebar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#c0ccd" }}>
        <div className="nav-btn">
          <Link to="#" className="nav-btn__icon">
            {sidebar ? (
              <AiOutlineClose onClick={showSideBar} />
            ) : (
              <FaBars onClick={showSideBar} />
            )}
          </Link>
        </div>
        <nav className={sidebar ? "nav active" : "nav"}>
          <ul className="nav__items" onClick={showSideBar}>
            {NavData.map((item, i) => {
              return (
                <li key={i} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
