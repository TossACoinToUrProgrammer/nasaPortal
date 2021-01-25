import React, { useEffect } from "react";
import { connect } from "react-redux";
import Preloader from "../../components/Preloader/Preloader";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { getApodPic } from "../../redux/reducers/pictureDayReducer";
import css from "./PictureDay.module.scss";
import { HashLink } from 'react-router-hash-link';
const PictureDay = ({ pic, isLoading, getApodPic }) => {
  
  useEffect(() => {
    if (!pic) {
      getApodPic();
    }
  }, [pic, getApodPic]);

  const openExplanationHandler = (e) => {
    e.target.closest("." + css.imageBox).classList.toggle(css.opened);
  };

  let body;
  if (pic && !pic.error)
    body = (
      <ul>
        <li className={css.imageBox}  style={{ backgroundImage: `url(${pic.url})` }} >
          {pic.media_type === "video" && <iframe title="video" className={css.videoBox}  width="100%"  height="100%" src={pic.url} />}
          {pic.media_type !== "video" && (
            <>
              <div className={css.moreBtn} onClick={openExplanationHandler}>
                <HashLink to='#explanation' title='explanation'><ArrowDropDownCircleIcon /></HashLink>
              </div>
              <div className={css.explanation}>
                <p>{pic.explanation}</p>
              </div>
            </>
          )}
        </li>
        <li>Date: {pic.date}</li>
        {pic.media_type === "video" && <li>Explanation: {pic.explanation}</li>}
      </ul>
    );

  if (pic && pic.error) body =  <> <h2>Error</h2> <p>{pic.error}</p> </> ;

  return <>
      <div className={css.wrapper}>
        <div className="container">
          <h1>Astronomian Picture of the Day</h1>
          {isLoading && <Preloader />}
          {body}
        </div>
      </div>
    </>
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.apodPic.isLoading,
    pic: state.apodPic.pic,
  };
};

export default connect(mapStateToProps, { getApodPic })(PictureDay);
