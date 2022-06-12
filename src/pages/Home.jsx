import { useState, useEffect, useRef, useContext, memo } from "react";
import "./home.css";
import logo from "../assets/logo.png";
import UploaderBox from "../containers/uploaderBox/UploaderBox";

function Home() {
  console.log("render");

  return (
    <div className='home section__padding'>
      <div className='home-content overall__max__width'>
        <div className='home-content-logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='home-content-search'>
          <UploaderBox />
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
