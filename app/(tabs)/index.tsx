import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import MovieCard from "../../components/MovieCard";
import { MovieContext } from "../../src/contexts";
import { useServer } from "../../src/hooks";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";
import { Movie } from "../../src/types";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const server = useServer();

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={[s.flex1, s.p3]}
      contentContainerStyle={s.g3}
      data={movies}
      keyExtractor={(item) => item._id.toString()}
      onEndReached={() => loadMovies()}
      ListHeaderComponent={() => (
        <Text style={[s.text, s.my4]}>
          Ordenamos <Text style={s.textStrong}>{movies.length}</Text> itens
          conforme o seu perfil
        </Text>
      )}
      renderItem={({ item: movie }) => (
        <MovieContext.Provider
          key={movie._id}
          value={{ movie, vote: (stars) => voteMovie(movie._id, stars) }}
        >
          <MovieCard />
        </MovieContext.Provider>
      )}
    />
  );

  async function loadMovies() {
    const response = await server.post<Movie[]>("/movies", {
      minRuntime: 5,
      maxRuntime: 500,
      requiredGenres: [],
      genres: [],
      minReleaseDate: "1800-07-12T00:00:00.000+00:00",
      maxReleaseDate: "2100-07-12T00:00:00.000+00:00",
      orderBy: "RELEASE_DATE_ASC",
      skip: movies.map((m) => m._id),
    });

    setMovies([...movies, ...response.data]);
    setLoading(false);
  }

  async function voteMovie(movieId: number, vote: number) {
    const movie = movies[movieId];
    if (!movie) return;

    const stars = movie.userVote === vote ? undefined : vote;
    server.post("/movies/vote", { movieId, stars });

    movie.userVote = stars;
    setMovies([...movies]);
  }
}
