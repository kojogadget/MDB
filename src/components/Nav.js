import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { NavData } from "./Nav.data";

export default function Nav() {
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => setNavbar(!navbar);

  return (
    <>
      <div className="nav-btn">
        <Link to="#" className="nav-btn__icon">
          {navbar ? (
            <AiOutlineClose onClick={showNavbar} />
          ) : (
            <FaBars onClick={showNavbar} />
          )}
        </Link>
      </div>
      <nav className={navbar ? "nav active" : "nav"}>
        <ul className="nav__items" onClick={showNavbar}>
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
    </>
  );
}
