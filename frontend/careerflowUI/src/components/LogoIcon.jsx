import React from "react";
import logo from "../assets/logo.png";

const LogoIcon = () => {
  return (
    <img
      src={logo}
      alt="MyCareerFlow Logo"
      className="h-8 w-auto md:h-9 object-contain" // responsive, clean fit
    />
  );
};

export default LogoIcon;