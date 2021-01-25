import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { pictureDayReducer } from "./pictureDayReducer";
import { spaceWeatherReducer } from "./spaceWeatherReducer";

export const rootReducer = combineReducers({
    spaceWeather: spaceWeatherReducer,
    apodPic: pictureDayReducer,
    auth: authReducer
})
