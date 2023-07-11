import { API_KEY } from "@env";
import axios from "axios";

type forecastParams = {
  cityName: string;
  days: string;
};

type locationsParams = {
  cityName: string;
};

const forecastEndpoint = (params: forecastParams) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = (params: locationsParams) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error, "<< [weather services error]");
    return null;
  }
};

export const fetchWeatherForecast = (params: forecastParams) => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLocations = (params: locationsParams) => {
  return apiCall(locationsEndpoint(params));
};
