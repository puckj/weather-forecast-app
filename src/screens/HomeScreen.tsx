import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState([1, 2, 3, 4]);
  const handleLocation = (location) => {
    console.log(location, " handleLocation()");
  };
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View
          // style={{ height: "7%" }}
          className="mx-4 relative z-50"
        >
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch && (
              <TextInput
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
              {locations.map((location, index) => {
                const showBorder = index + 1 != locations.length;
                const borderClass = showBorder
                  ? " border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(location)}
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
                      London, United Kingdom
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        {/* forecast section */}
        <View></View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
