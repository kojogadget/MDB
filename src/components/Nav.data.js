import React from "react";
import { AiFillHome } from "react-icons/ai";
import { GiAmericanShield } from "react-icons/gi";
import { MdOutlineLocalMovies, MdInfoOutline } from "react-icons/md";

export const NavData = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
    className: "nav__link",
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <MdOutlineLocalMovies />,
    className: "nav__link",
  },
  {
    title: "Characters",
    path: "/characters",
    icon: <GiAmericanShield />,
    className: "nav__link",
  },
  {
    title: "About",
    path: "/about",
    icon: <MdInfoOutline />,
    className: "nav__link",
  },
];
