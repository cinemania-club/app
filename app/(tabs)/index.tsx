import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import MovieCard, { Movie } from "../../components/movie";
import colors from "../../theme/colors";
import s from "../../theme/spaces";
import ss from "../../theme/styles";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={ss.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.p3}>
      <Text style={[ss.text._, s.my4]}>
        Ordenamos <Text style={ss.text.strong}>{movies.length}</Text> itens
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
    const response = await axios.get<Movie[]>(
      `${process.env.EXPO_PUBLIC_API_URL}/movies`,
    );

    setMovies(response.data);
    setLoading(false);
  }
}
