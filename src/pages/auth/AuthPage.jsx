import React from "react";
import { connect } from "react-redux";

import css from "./AuthPage.module.scss";

import { logout } from "../../redux/reducers/authReducer";
import AuthForm from "./AuthForm";
import ProfilePage from "./ProfilePage";
import { Route, Switch } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

const AuthPage = ({ isAuth, isLoading, message }) => {

  return (
    <div className={css.wrapper}>
      <div className="container">
        { isLoading ? <Preloader /> : 
        <Switch >
          <Route exact path='/auth' render={()=>!isAuth ? <AuthForm /> : <ProfilePage />} />
          <Route exact path='/auth-success' render={()=><ProfilePage withSource={true} />} />
        </Switch>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps, { logout })(AuthPage);
