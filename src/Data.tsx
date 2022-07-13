import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Sound from "react-native-sound";
import SoundPlayer from "react-native-sound-player";

// // var Sound = require("react-native-sound");

// Sound.setCategory("Playback");

// var ding = new Sound("ding.mp3", Sound.MAIN_BUNDLE, (error: any) => {
//   if (error) {
//     console.log("failed to load the sound", error);
//     return;
//   }
//   // if loaded successfully
//   console.log(
//     "duration in seconds: " +
//       ding.getDuration() +
//       "number of channels: " +
//       ding.getNumberOfChannels()
//   );
// });

const Data = () => {
  const [value, setValue] = useState("");
  const [mean, setMean] = useState<any>([]);
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);
  const [audio, setAudio] = useState("");

  //   useEffect(() => {
  //     ding.setVolume(1);
  //     return () => {
  //       ding.release();
  //     };
  //   }, []);

  //   const playPause = () => {
  //     ding.play((success: any) => {
  //       if (success) {
  //         console.log("successfully finished playing");
  //       } else {
  //         console.log("playback failed due to audio decoding errors");
  //       }
  //     });
  //   };

  const getData = async (value: string) => {
    //github.com/mcnaveen/Random-Words-API

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
      );
      const data: any = await response.json();
      console.log(data);
      setWord(data[0].word);
      setAudio(data[0].phonetics[0].audio);
      const arr: any = [];
      if (data?.length > 0) {
        data[0]?.meanings[0]?.definitions?.forEach((item: any) => {
          arr.push(item.definition);
          console.log("def", item.definition);
        });
      } else {
        setError(true);
      }

      console.log(arr);
      setMean(arr);
    } catch (err) {
      setError(true);
    }
  };

  const getRandom = async () => {
    try {
      const response = await fetch(` https://random-words-api.vercel.app/word`);
      const data: any = await response.json();
      console.log(data);
      setValue(data[0].word);
      getData(data[0].word);
    } catch (err) {
      setError(true);
    }
  };

  const playAudio = async () => {
    try {
      SoundPlayer.playUrl(audio);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  useEffect(() => {
    getRandom();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.inputcontainer}>
        <Text style={style.heading}>Type Word to search</Text>
        <View style={style.inputc}>
          <TextInput
            value={value}
            placeholder="Type Here"
            placeholderTextColor={"gray"}
            style={style.input}
            multiline
            numberOfLines={4}
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
          />

          <View style={style.btn}>
            <Button title="Search" onPress={() => getData(value)} />
          </View>
        </View>
      </View>
      <Snackbar
        visible={error}
        onDismiss={() => setError(false)}
        action={{
          label: "Ok",
          onPress: () => {
            // Do something
          },
        }}
      >
        No Results Found for this word.
      </Snackbar>

      {word ? (
        <Text
          style={{
            width: "100%",
            justifyContent: "flex-start",
            marginVertical: 15,
            color: "green",
            fontSize: 18,
          }}
        >
          Search Results for {word}
        </Text>
      ) : null}

      <TouchableOpacity onPress={playAudio}>
        <Text>play</Text>
      </TouchableOpacity>
      {/* {error && (
        <Text style={style.error}> No Results Found for this word.</Text>
      )} */}
      <FlatList
        data={mean}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={style.meantext} key={index}>
              <Text style={style.txt}>
                {index + 1}. {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Data;

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  inputcontainer: {
    width: "100%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 10,
  },
  heading: {
    color: "blue",
    fontSize: 20,
    backgroundColor: "unset",
  },
  inputc: {
    width: "100%",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 10,
    height: 50,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  mean: {
    backgroundColor: "lightgray",
    width: "100%",
    padding: 15,
    height: 10,
  },
  meantext: {
    color: "orange",
    fontSize: 18,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  btn: {
    marginTop: 10,
    borderRadius: 20,
    width: "100%",

    alignItems: "center",
  },
  txt: {
    color: "blue",
    fontSize: 14,
  },
  error: {
    color: "red",
  },
});
