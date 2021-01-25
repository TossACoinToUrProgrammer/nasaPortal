import React from "react";
import css from "./MainPage.module.scss";

const MainPage = () => {
  const parallaxHandler = () => {
    let background;
    let prevX, prevY;
    const shouldAnimate = (mouseX, mouseY) => {
      if (!prevX) prevX = mouseX;
      if (!prevY) prevY = mouseY;
      return (
        (prevX > mouseX ? prevX - mouseX > 20 : mouseX - prevX > 20) ||
        (prevY > mouseY ? prevY - mouseY > 20 : mouseY - prevY > 20)
      );
    };
    return (e) => {
      if (!background)
        background = e.currentTarget.querySelector("#parallaxBg");
      if (shouldAnimate(e.clientX, e.clientY)) {
        prevX = e.clientX;
        prevY = e.clientY;
        let x = prevX / window.innerWidth;
        let y = prevY / window.innerHeight;
        background.style.transform =
          "translate(-" + x * 80 + "px, -" + y * 80 + "px)";
      }
    };
  };
  return (
    <>
      <div onMouseMove={parallaxHandler()} className={css.header}>
        <div className={css.parallax}>
          <div id="parallaxBg" className={css.parallaxBg}></div>
        </div>
        
        <div className="container">
          <div className={css.title}>
            <ul>
              <li>as</li>
              <li>part</li>
              <li>of</li>
              <li>our</li>
            </ul>
            <ul>
              <li>ongoing</li>
              <li>humanization</li>
              <li>efforts,</li>
              <li>we</li>
            </ul>
            <ul>
              <li>were</li>
              <li>advised</li>
              <li>to</li>
              <li>say-</li>
            </ul>
            <ul>
              <li>hello.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
