import React from "react";
import jwtDecode from "jwt-decode";
import { setAuth } from "../redux/reducers/authReducer";
import { connect } from "react-redux";
import { compose } from "redux";

const withAuth = (Component) => ({ ...props }) => {
  const { email, setAuth } = props;
  if (!email && localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      const { userId, email } = decodedToken;
      setAuth(email, userId, localStorage.getItem("jwtToken"));
    }
  }
  return <Component {...props} />;
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
  };
};

export default compose(
  connect(mapStateToProps, { setAuth }),
  withAuth
);

