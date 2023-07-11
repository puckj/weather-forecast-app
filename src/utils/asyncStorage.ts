import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeCityName = async (cityName: string) => {
  try {
    await AsyncStorage.setItem("city", cityName);
  } catch (e) {
    // saving error
    console.error("Error storing value: ", e);
  }
};

export const getCityName = async () => {
  try {
    const cityName = await AsyncStorage.getItem("city");
    return cityName;
  } catch (e) {
    // error reading value
    console.error("Error retrieving value: ", e);
  }
};
