import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import css from "./Navbar.module.scss";

import { logout } from "../../redux/reducers/authReducer";

const NavItem = ({ path, title, index}) => {
  return (
    <li>
      <NavLink className={css.navbar__item} to={path}>
        <div className={css.index}>0{index + 1}</div>
        {title && (
          <div className={css.title}>
            <span>{title}</span>
            <span>{title}</span>
          </div>
        )}
      </NavLink>
    </li>
  );
};
const Navbar = ({ email, logout }) => {
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  const links = [
    { path: "/", title: "Main" },
    { path: "space-weather", title: "News" },
    { path: "space-weather", title: "Space Weather" },
    { path: "picture-day", title: "Picture of the Day" },
  ];
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <NavLink to="/">NASA</NavLink>
      </div>
      <div className="container">
        <a id="top"></a>
        <ul className={css.navbar}>
          {links.map((item, index) => (
            <NavItem path={item.path} title={item.title} index={index} key={index} />
          ))}
        </ul>
        <ul className={css.sideNavbar}>
          <li>
            <HashLink className={css.navbar__item} to="#top"></HashLink>
          </li>
        </ul>
      </div>
      <div className={css.auth} onClick={logoutHandler}>
        <NavLink to="/auth">{email ? "Logout" : "Sign In"}</NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
