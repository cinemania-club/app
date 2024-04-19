import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import MovieCard, { Movie } from "../../components/MovieCard";
import { useServer } from "../../hooks";
import { palette } from "../../theme/colors";
import s from "../../theme/styles";

type MoviePayload = {
  movie: Movie;
  vote: (stars: number) => void;
};

export const MovieContext = createContext<MoviePayload | undefined>(undefined);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const server = useServer();

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
          <MovieContext.Provider
            key={movie._id}
            value={{ movie, vote: (stars) => voteMovie(movie._id, stars) }}
          >
            <MovieCard />
          </MovieContext.Provider>
        ))}
      </View>
    </ScrollView>
  );

  async function getMovies() {
    const response = await server.post<Movie[]>("/movies", {
      minRuntime: 5,
      maxRuntime: 500,
      requiredGenres: [],
      genres: [],
      minReleaseDate: "1800-07-12T00:00:00.000+00:00",
      maxReleaseDate: "2100-07-12T00:00:00.000+00:00",
      orderBy: "RELEASE_DATE_ASC",
    });

    setMovies(response.data);
    setLoading(false);
  }

  async function voteMovie(movieId: number, stars: number) {
    server.post("/movies/vote", { movieId, stars });

    const movie = movies.find((movie) => movie._id === movieId);
    if (!movie) return;

    movie.userStars = stars;
    setMovies([...movies]);
  }
}
