import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../service/weather";
import { weatherImages } from "../constants";
import * as Progress from "react-native-progress";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchInitialWeatherDisplay();
  }, []);

  const fetchInitialWeatherDisplay = () => {
    fetchWeatherForecast({
      cityName: "Bangkok",
      days: "3",
    }).then((data) => {
      // console.log(data, " << [forecast DATA]");
      setWeather(data);
      setIsLoading(false);
    });
  };

  const handleSelectLocation = (location: any) => {
    // console.log(location, " handleSelectLocation()");
    setIsLoading(true);
    setLocations([]);
    setShowSearch(false);
    fetchWeatherForecast({
      cityName: location.name,
      days: "3",
    }).then((data) => {
      // console.log(data, " << [forecast DATA]");
      setWeather(data);
      setIsLoading(false);
    });
  };
  const handleSearchLocation = (value: string) => {
    // console.log(value, " handleSearchLocation");
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        // console.log(data, "*/*");
        setLocations(data);
      });
    } else {
      setLocations([]);
    }
  };
  const handleTextDebounce = useCallback(
    debounce(handleSearchLocation, 1200),
    []
  );

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      {isLoading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View
            // style={{ height: "7%" }}
            className="mx-4 relative z-50"
          >
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch && (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="lightgray"
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                />
              )}

              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{ backgroundColor: theme.bgWhite(0.3) }}
              >
                <Entypo
                  name="magnifying-glass"
                  size={25}
                  color={showSearch ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch && (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location: any, index) => {
                  const showBorder = index + 1 != locations.length;
                  const borderClass = showBorder
                    ? " border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectLocation(location)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1" +
                        borderClass
                      }
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={20}
                        color="gray"
                      />
                      <Text className="text-black text-lg ml-2">
                        {location.name}, {location.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* forecast section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location */}
            <Text className="text-white text-center text-2xl font-bold">
              {weather.location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {" " + weather.location?.country}
              </Text>
            </Text>
            {/* weather image */}
            <View className="flex-row justify-center">
              <Image
                source={weatherImages[weather.current.condition.text]}
                className="w-52 h-52"
              />
            </View>
            {/* degree celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-6xl text-white ml-5">
                {weather.current.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {weather.current.condition.text}
              </Text>
            </View>
            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather.current.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather.current.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>
          {/* forecast session for next days */}
          <View className="mb-5 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <AntDesign name="calendar" size={22} color="white" />
              <Text className="text-white text-base"> Daily forecast</Text>
            </View>
            <View className="flex-row justify-center space-x-5">
              {weather.forecast.forecastday.map((item, index) => {
                // console.log(item);
                const date = new Date(item.date);
                let dayName = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                dayName = dayName.split(",")[0];

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      source={weatherImages[item.day.condition.text]}
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item.day.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
