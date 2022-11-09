import React from 'react';
import logo from "../img/Perspektiv.gif"
import "../css/App.css";

function Logo() {
  return (
    <div className="black-out">
      <img src={logo} className="logo-center"/>
    </div>
  )
}

export default Logo;