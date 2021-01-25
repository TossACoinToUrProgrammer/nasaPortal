import * as axios from 'axios';
import apiKey from './apiKey';
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const instance = axios.create({
    baseURL: "https://api.nasa.gov/DONKI/",
})

const queryTemplate=(params = {})=>{
    let path='notifications?';
    for(let key in params){
        path+=`${key}=${params[key]}&`;
    }
    path+=apiKey;
    return instance
        .get(path)
        .then(response=>response.data);
  }

export const spaceWeatherApi = {
    getNews: queryTemplate,
};