import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { MovieType } from "./backend";
import Movie from "./movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const response = await axios.get(
      "http://localhost:3000/admin/scrapper/get-movies",
    );

    setMovies(response.data);
    setLoading(false);
  };

  useEffect(() => {
    // Executa na primeira vez que o componente é desenhado
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
        Listando <Text style={styles.movieCount}>1234</Text> itens
      </Text>

      {movies.map((movie) => (
        <Movie
          id={movie.id}
          title={movie.title}
          releaseYear={movie.releaseYear}
          duration={movie.duration}
          grade={movie.grade}
        />
      ))}
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
