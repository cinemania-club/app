import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import MovieCard, { Movie } from "../../components/MovieCard";
import { palette } from "../../theme/colors";
import s from "../../theme/styles";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.p3}>
      <Text style={[s.text, s.my4]}>
        Ordenamos <Text style={s.textStrong}>{movies.length}</Text> itens
        conforme o seu perfil
      </Text>

      <View style={s.g3}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );

  async function getMovies() {
    const response = await axios.post<Movie[]>(
      `${process.env.EXPO_PUBLIC_API_URL}/movies`,
      {
        minRuntime: 5,
        maxRuntime: 500,
        requiredGenres: [],
        genres: [],
        minReleaseDate: "1800-07-12T00:00:00.000+00:00",
        maxReleaseDate: "2100-07-12T00:00:00.000+00:00",
        orderBy: "RELEASE_DATE_ASC",
      },
    );

    setMovies(response.data);
    setLoading(false);
  }
}
