import axios from "axios";

const API_KEY = process.env.REACT_APP_WHEATER_API_KEY;

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://weather-app-backend-production.up.railway.app";

export async function getCoordsByCity(cityname, statecode=undefined, countrycode=undefined, limit=5) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}${statecode ? ","+statecode : "" }${countrycode ? ","+countrycode : "" }${limit ? "&limit="+limit : "" }&appid=${API_KEY}&lang=pt_br`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function getWeekForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function getForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function saveCityHistory (data){
    try {
        const response = await axios.post(`${BASE_URL}/cityHistory`, {
            ...data
        });
        return response.data;
    } catch (error) {
        return null
    }
}

export async function getAllHistory (){
    try {
        const response = await axios.get(`${BASE_URL}/cityHistory`);
        return response.data;
    } catch (error) {
        return null
    }
}

export async function getCityHistory (id){
    try {
        const response = await axios.get(`${BASE_URL}/cityHistory/${id}`);
        return response.data;
    } catch (error) {
        return null
    }
}