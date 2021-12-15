import React from "react";
import Nav from "./Nav";
import "../sass/components/_header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Nav />
        <h1>A MCU DATABASE</h1>
      </div>
    </header>
  );
}
