import React, { useEffect } from "react";
import { connect } from "react-redux";

import { logout, oAuthLogin } from "../../redux/reducers/authReducer";
import Preloader from "../../components/Preloader/Preloader";
import { NavLink, Redirect } from "react-router-dom";

const ProfilePage = ({ email, isLoading, withSource = false, oAuthLogin, logout }) => {

    useEffect(()=>{
        if(withSource && !email){
            oAuthLogin();
        }
    }, [email, oAuthLogin, withSource])

  if (isLoading) return <Preloader />;
  if(withSource) return <Redirect to="/auth" />;

  return (
    <>
      <h2>Profile</h2>
      <p>{email}</p>
      <button
        className="btn yellow darken-4"
        style={{ marginRight: "10px" }}
        onClick={logout}
      >
       <NavLink to='/auth'>Выйти</NavLink> 
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, { logout, oAuthLogin })(ProfilePage);
