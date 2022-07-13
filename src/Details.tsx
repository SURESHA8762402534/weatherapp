import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style";

const Deatails: FC<any> = (props) => {
  const [country, setCountry] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const API_KEY = "54ca168c72ac5e4405cc675956226596";
  const [capital, setcapital] = useState("");

  const navigation = useNavigation<any>();

  const getWeather = async (capital: string) => {
    console.log(capital);
    try {
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
      );
      console.log(res);
      setWeather(res.data.current);
    } catch (error) {
      console.log(error);
    } finally {
      setModal(true);
    }
  };

  const getCountryDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3/name/${props.route.params.name}`
      );
      console.log(res);
      setCountry(res.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountryDetails();
  }, []);

  return (
    <SafeAreaView style={style.container1}>
      <View style={style.back}>
        <View style={style.btn}>
          <Button
            testID="back"
            title="Back"
            onPress={() => navigation.navigate("home")}
            color={"lightblue"}
          />
        </View>
      </View>
      <SafeAreaView style={style.container1}>
        <FlatList
          data={country}
          renderItem={({ item, index }) => (
            <View testID={`test-${index}`} style={style.card}>
              <View style={{ width: "60%" }}>
                <Text> Name : {item?.name.common}</Text>
                <Text> Capital : {item?.capital[0]} </Text>
                <Text> Population : {item?.population}</Text>
                <Text> Latitude : {item?.latlng[0]}</Text>
                <Text> Longitude : {item?.latlng[1]}</Text>
                <Button
                  testID="capital"
                  title={"Capital Weather"}
                  onPress={() => {
                    setcapital(item?.capital[0]);
                    getWeather(item?.capital[0]);
                  }}
                />
              </View>
              <View
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={{ uri: item?.flags[1] }}
                  style={{ width: "100px", height: "100px" }}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => {
            return (
              <View>
                {loading ? (
                  <ActivityIndicator color={"blue"} />
                ) : !error ? (
                  <Text>Nothing Found </Text>
                ) : (
                  <Text>Somthing went Wrong</Text>
                )}
              </View>
            );
          }}
        />
      </SafeAreaView>
      <Modal visible={modal}>
        <View style={style.back}>
          <View style={style.btn1}>
            <Button
              testID="back1"
              title="Back"
              onPress={() => setModal(false)}
            />
          </View>
        </View>
        <View style={style.card1}>
          <View style={{ width: "60%" }}>
            <Text>Capital : {capital.toUpperCase()} </Text>
            <Text>
              {" "}
              Temperature : {weather?.temperature} <sup>0</sup> Celcius
            </Text>
            <Text> Wind Speed : {weather?.wind_speed} km/hr</Text>
            <Text> Pricip : {weather?.precip}</Text>
          </View>
          <View
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Image
              source={{ uri: weather?.weather_icons[0] }}
              style={{ width: "100px", height: "100px" }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Deatails;
