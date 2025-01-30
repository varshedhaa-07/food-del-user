import React, { useContext, useState } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { StoreContext } from "../../context/StoreContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");

  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () =>{
     localStorage.removeItem("token");
     setToken("");
     navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to='/' className="navbar-logo">FoodieApp</Link>
      </div>
      <ul className="navbar-middle">
          <Link to='/' onClick={() => setMenu("home")} className={menu==="home" ? "active": ""}>Home</Link>
          <a href="#about" onClick={() => setMenu("about")} className={menu==="about" ? "active": ""}>About</a>
          <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu==="menu" ? "active": ""}>Menu</a>
          <a href="#contact" onClick={() => setMenu("contact")} className={menu==="contact" ? "active": ""}>Contact</a>
        </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><FaShoppingCart className="icon" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?
        <button onClick={() => setShowLogin(true)} className="signin-button" >Sign in</button>
        :<div className="navbar-profile"> 
          <FaRegCircleUser className="nav-profile"/>
          <ul className="nav-profile-dropdown">
            <li onClick={logout}><IoLogOutOutline /><p>Logout</p></li>
          </ul>
          </div>}
      </div>
    </nav>
  );
};

export default Navbar;
