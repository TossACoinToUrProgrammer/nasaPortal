import React, { useEffect } from "react";
import { connect } from "react-redux";

import css from "./SpaceWeather.module.scss";
import Preloader from "../../components/Preloader/Preloader";
import NewsCard from "./NewsCard/NewsCard";

import { getNewsFromApi } from "../../redux/reducers/spaceWeatherReducer";

const SpaceWeather = ({ news, isLoading, getNewsFromApi }) => {
  useEffect(() => {
    if (news.length === 0) {
      getNewsFromApi();
    }
  }, [JSON.stringify(news)]);

  return (
    <>
      <div className={css.wrapper}>
        <div className="container">
          <h1>Space Weather Notifications</h1>
          {isLoading && <Preloader />}
          {news.map((item, index) => (
            <NewsCard key={item.messageID} index={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    news: state.spaceWeather.news,
    isLoading: state.spaceWeather.isLoading,
  };
};

export default connect(mapStateToProps, { getNewsFromApi })(SpaceWeather);
