import React from "react";
import { Route, Switch } from "react-router-dom";

import "materialize-css";

import "./scss/App.scss";

import MainPage from "./pages/main/MainPage";
import Navbar from "./components/Navbar/Navbar";
import SpaceWeather from "./pages/space-weather/SpaceWeather";
import PictureDay from "./pages/picture-of-the-day/PictureDay";
import AuthPage from "./pages/auth/AuthPage";

import withAuth from "./hoc/withAuth";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/space-weather" render={() => <SpaceWeather />} />
        <Route path="/picture-day" render={() => <PictureDay />} />
        <Route path="/auth" render={() => <AuthPage />} />
        <Route path="/auth-success" render={() => <AuthPage />} />
      </Switch>
    </div>
  );
}

export default withAuth(App);
