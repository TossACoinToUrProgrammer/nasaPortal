import React from "react";
import css from "../SpaceWeather.module.scss";
import MessageBody from "./MessageBody";
import { HashLink } from 'react-router-hash-link';
const ActionSection = ({ index }) => {
  const showMoreHandler = (e) => {
    let ul = e.target.closest("." + css.card);
    ul.classList.toggle(css.opened);
  };
  return (
    <>
      <span onClick={showMoreHandler} className={css.showBtn}>
        show more
      </span>
      <HashLink to={"#" + index}>
        <span onClick={showMoreHandler} className={css.hideBtn}>
          hide
        </span>
      </HashLink>
    </>
  );
};
const NewsCard = ({ item, index }) => {
  let indexProp = index + 1;
  return (
    <ul className={css.card}>
      <a id={indexProp}></a>
      #: {indexProp}
      <MessageBody text={item.messageBody} />
      <ActionSection index={indexProp} />
      <hr />
    </ul>
  );
};

export default NewsCard;
