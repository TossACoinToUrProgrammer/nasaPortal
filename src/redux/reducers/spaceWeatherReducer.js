import { SET_NEWS, TOGGLE_LOADING } from "../actions";
import { spaceWeatherApi } from "../api/spaceWeatherApi";

let initialState = {
  news: [],
  isLoading: false,
};

export const spaceWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, isLoading: action.payload || !state.isLoading };
    case SET_NEWS:
      return { ...state, news: action.payload };
    default:
      return state;
  }
};

export const setNews = (payload) => {
  return {
    type: SET_NEWS,
    payload: payload,
  };
};

export const toggleLoading = (bool = null) => {
    return {
        type: TOGGLE_LOADING,
        payload: bool
    }
}

export const getNewsFromApi =  () => {
  return async(dispatch) => {
      dispatch(toggleLoading(true));
      const data = await spaceWeatherApi.getNews();
      dispatch({type:SET_NEWS, payload: data});
      dispatch(toggleLoading(false));
  };
};
