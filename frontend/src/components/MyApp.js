//import Register from "./Register";
import React from 'react';
import logo from "../img/Perspektiv.gif";
import "../css/App.css";

function MyApp() {

  // this is a placeholder loading page with the logo
  return (
    <div className="black-out">
      <img src={logo} className="logo-center"/>
    </div>
  )
}

export default MyApp;

