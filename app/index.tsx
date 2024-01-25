import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { getMovies } from "./backend";
import Movie from "./movie";

export default function Home() {
  const [movies, setMovies] = useState(undefined);

  getMovies().then((data) => {
    console.log("SUCESSO", data);

    setMovies(data);
  });

  console.log("antes do if");

  if (!movies) {
    console.log("dentro do if");
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  console.log("depois do if");

  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>
        Listando <Text style={styles.movieCount}>1234</Text> itens
      </Text>
      <Movie name={movies[0].name} duracao="185 min" nota="4.54" />
      <Movie name={movies[1].name} duracao="120 min" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  headTitle: {
    textAlign: "center",
    color: "white",
    margin: 30,
  },
  movieCount: {
    color: "#F9284E",
  },
});
