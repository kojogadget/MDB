import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "../sass/components/_nav.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { NavData } from "./Nav.data";

export default function Nav() {
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => setNavbar(!navbar);

  const ref = useRef();

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (navbar && ref.current && !ref.current.contains(e.target)) {
        setNavbar(false);
      }
    };
    document.addEventListener("click", checkClickOutside);
    return () => document.removeEventListener("click", checkClickOutside);
  }, [navbar]);

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
      <nav className={navbar ? "nav active" : "nav"} ref={ref}>
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
