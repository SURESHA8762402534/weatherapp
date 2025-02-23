import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Main from "./src/Main";
import Deatails from "./src/Details";
import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState("data");
  const [mean, setMean] = useState<any>([]);
  const options = {
    headerShown: false,
  };
  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.length > 0) {
        data[0]?.meanings[0]?.definitions?.forEach((item: any) => {
          mean.push(item.definition);
        });
      }
      console.log(mean);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [value]);
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="home" component={Main} options={options} />
        <Screen name="details" component={Deatails} options={options} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
