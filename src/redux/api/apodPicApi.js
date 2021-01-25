import * as axios from 'axios';
import apiKey from './apiKey';

const instance = axios.create({
    baseURL: "https://api.nasa.gov/planetary/apod?"+apiKey,
})

export const apodPicApi = {
    getPic: () => instance.get().then(response => response.data)
}