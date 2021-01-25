import React from "react";
import { Preloader as Loader } from "react-materialize";
import css from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={css.wrapper}>
      <Loader active color="blue" flashing={false} size="big" />
    </div>
  );
};

export default Preloader;
