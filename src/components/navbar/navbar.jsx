import { memo } from "react";
import logo from "../../assets/logo.png";
import SearchBar from "../searchBar/SearchBar";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className='navbar section__padding'>
      <div className='navbar-content overall__max__width'>
        <Link className='link' to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <SearchBar navbar={true} />
      </div>
    </div>
  );
}

export default memo(Navbar);
