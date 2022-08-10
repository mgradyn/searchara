import { memo } from "react";
import logo from "../assets/logo.png";
import "./loading.css";

function Loading() {
  return (
    <div className='loading '>
      <div className='loading-container overall__max__width'>
        <img className='background__img' src={logo} alt='logo' />
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default memo(Loading);
