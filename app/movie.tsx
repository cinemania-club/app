import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

import { MovieType } from "./backend";

export default function Movie(props: MovieType) {
  return (
    <View style={styles.card}>
      <View style={styles.upperSubCard}>
        <Image
          source={require("../assets/images/posters/oppenheimer-poster.webp")}
          style={styles.upperSubCardPosterImage}
        />
        <View style={[styles.UpperSubCardInfo]}>
          <Text style={styles.upperSubCardMovieTitle}>{props.title}</Text>
          <View style={[styles.upperSubCardMiddleRow]}>
            <View style={[styles.upperSubCardEmoji]}>
              <FontAwesome5
                name="laugh-squint"
                size={24}
                color="white"
                style={styles.emoji}
              />
              <FontAwesome5
                name="grin-hearts"
                size={24}
                color="white"
                style={styles.emoji}
              />
              <FontAwesome5 name="surprise" size={24} color="white" />
            </View>
            <Text style={styles.text}>{props.releaseYear}</Text>
            <Text style={styles.text}>{props.duration}</Text>
            <Text style={styles.text}>{props.grade}</Text>
          </View>
          <View style={styles.profiles}>
            <Image
              source={require("../assets/images/posters/oppenheimer-poster.webp")}
              style={styles.lowerIconProfile}
            />
            <Image
              source={require("../assets/images/posters/oppenheimer-poster.webp")}
              style={styles.lowerIconProfile}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomSubCard}>
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.bottomSubCardIcons}
        />
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.bottomSubCardIcons}
        />
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.bottomSubCardIcons}
        />
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.bottomSubCardIcons}
        />
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.bottomSubCardIcons}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 16,
    margin: 16,
  },
  upperSubCard: {
    flexDirection: "row",
    height: 128,
  },
  upperSubCardPosterImage: {
    width: 100,
    height: 150,
    resizeMode: "stretch",
  },
  UpperSubCardInfo: {
    flex: 1,
    padding: 12,
    backgroundColor: "#181818",
  },
  upperSubCardMovieTitle: {
    color: "white",
    marginBottom: 16,
  },
  upperSubCardMiddleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },
  upperSubCardEmoji: {
    flexDirection: "row",
  },
  emoji: {
    marginRight: 12,
  },
  bottomSubCard: {
    backgroundColor: "#202020",
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSubCardIcons: {
    width: 32,
    height: 32,
    margin: 16,
  },
  lowerIconProfile: {
    height: 30,
    width: 30,
    borderColor: "#F9284E",
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 12,
    marginRight: 5,
  },
  profiles: {
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
