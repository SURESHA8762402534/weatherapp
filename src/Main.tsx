import React, { FC, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

const Main: FC = () => {
  const [name, setName] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={style.container}>
      <SafeAreaView style={style.container}>
        <View style={style.border}>
          <TextInput
            testID="textbox"
            value={name}
            placeholder="Enter Country"
            placeholderTextColor={"gray"}
            onChangeText={(Text) => {
              setName(Text);
            }}
            style={style.input}
          />

          <Button
            testID="btn"
            disabled={!name}
            title="Submit"
            onPress={() => {
              navigation.navigate("details", { name: name });
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Main;
