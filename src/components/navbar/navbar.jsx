import logo from "../../assets/logo.png";
import SearchBar from "../searchBar/SearchBar";
import "./navbar.css";

function Navbar() {
  return (
    <div className='navbar section__padding'>
      <div className='navbar-content overall__max__width'>
        <img src={logo} alt='logo' />
        <SearchBar navbar={true} />
      </div>
    </div>
  );
}

export default Navbar;
