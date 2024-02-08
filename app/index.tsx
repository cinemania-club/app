import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Movie, { MovieType } from "./movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>
        Listando <Text style={styles.movieCount}>{movies.length}</Text> itens
      </Text>

      {movies.map((movie) => (
        <Movie key={movie._id} movieData={movie} />
      ))}
    </View>
  );

  async function getMovies() {
    const response = await axios.get<MovieType[]>(
      "http://localhost:3000/movies",
    );

    setMovies(response.data);
    setLoading(false);
  }
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
