import React from "react";
import logo from "../../../../../public/assets/logo.svg";
import Image from "next/image";

type Props = {
  buttons: Array<string>;
};

export const Navbar: React.FC<Props> = ({ buttons }) => {
  return (
    <div className="navbar">
      <div className="logo default-size">
        <Image src={logo} alt="logo picture" />
      </div>
      <div className="menus">
        <div className="buttons">
          {buttons.map((button) => {
            return (
              <span className="selected" key={button}>
                {button}
              </span>
            );
          })}
        </div>
      </div>
      <div id="right-part default-size"></div>
    </div>
  );
};
