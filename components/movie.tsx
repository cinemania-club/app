import { FontAwesome5 } from "@expo/vector-icons";
import { getYear } from "date-fns";
import { Image, StyleSheet, Text, View } from "react-native";

import { brNumber } from "../app/util";

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
};

type Props = {
  movieData: Movie;
};

export default function MovieCard(props: Props) {
  const movie = props.movieData;

  return (
    <View style={styles.card}>
      <View style={styles.upperSubCard}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          style={styles.upperSubCardPosterImage}
        />
        <View style={[styles.UpperSubCardInfo]}>
          <Text style={styles.upperSubCardMovieTitle}>{movie.title}</Text>
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
            <Text style={styles.text}>{getYear(movie.release_date)}</Text>
            <Text style={styles.text}>{movie.runtime} min</Text>
            <Text style={styles.text}>{brNumber(movie.vote_average, 3)}</Text>
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
