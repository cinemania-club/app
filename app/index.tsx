import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { MovieType } from "./backend";
import Movie from "./movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const response = await axios.get("http://localhost:3000/movies");

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
        Listando <Text style={styles.movieCount}>{movies.length}</Text> itens
      </Text>

      {movies.map((movie) => (
        <Movie
          _id={movie._id}
          title={movie.title}
          release_date={movie.release_date}
          runtime={movie.runtime}
          vote_average={movie.vote_average}
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
