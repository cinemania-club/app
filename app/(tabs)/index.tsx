import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MovieCard, { Movie } from "../../components/movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#F9284E" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>
        Listando <Text style={styles.movieCount}>{movies.length}</Text> itens
      </Text>

      {movies.map((movie) => (
        <MovieCard key={movie._id} movieData={movie} />
      ))}
    </View>
  );

  async function getMovies() {
    const response = await axios.get<Movie[]>(
      `${process.env.EXPO_PUBLIC_API_URL}/movies`,
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
  center: {
    justifyContent: "center",
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
