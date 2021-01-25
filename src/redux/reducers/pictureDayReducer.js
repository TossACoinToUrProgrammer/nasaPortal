import { PIC_TOGGLE_LOADING, SET_APOD_PIC } from "../actions";
import { apodPicApi } from "../api/apodPicApi";

let initialState = {
  pic: null,
  isLoading: false
};

export const pictureDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APOD_PIC:
      return { ...state, pic: action.payload };
    case PIC_TOGGLE_LOADING:
      return {...state, isLoading: !state.isLoading}
    default:
      return state;
  }
};

const toggleIsLoading = () => {
    return {
        type: PIC_TOGGLE_LOADING
    }
}
const setPic = (data) => {
    return {
        type: SET_APOD_PIC,
        payload: data
    }
}
export const getApodPic = () => {
    return async(dispatch) => {
        dispatch(toggleIsLoading());
        try {
          const data = await apodPicApi.getPic();
          dispatch(setPic(data));
        } catch (e) {
          if(e.response.data && e.response.data.error && e.response.data.error.message){
            dispatch(setPic({error: e.response.data.error.message}));
          } else {
            dispatch(setPic({error: e.message}));
          }
        }
        dispatch(toggleIsLoading());
    }
}
