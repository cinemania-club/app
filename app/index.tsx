import _ from "lodash";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import DrawerFrame from "../components/DrawerFrame";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../src/contexts";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { Movie } from "../src/types";

type MoviesResponse = {
  onboarding: Onboarding;
  movies: Movie[];
};

type Onboarding = {
  votes: number;
  target: number;
} | null;

export default function Lista() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [onboarding, setOnboarding] = useState<Onboarding>(null);

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
    <DrawerFrame title="Lista">
      <FlatList
        style={[s.flex1, s.p3]}
        contentContainerStyle={s.g3}
        data={movies}
        stickyHeaderIndices={onboarding ? [0] : undefined}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={() => loadMovies()}
        ListHeaderComponent={() => (
          <Header itemsCount={movies.length} onboarding={onboarding} />
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
    </DrawerFrame>
  );

  async function loadMovies() {
    const response = await server.post<MoviesResponse>("/movies", {
      minRuntime: 5,
      maxRuntime: 500,
      requiredGenres: [],
      genres: [],
      minReleaseDate: "1800-07-12T00:00:00.000+00:00",
      maxReleaseDate: "2100-07-12T00:00:00.000+00:00",
      orderBy: "RELEASE_DATE_ASC",
      skip: movies.map((m) => m._id),
    });

    const data = response.data;

    setMovies([...movies, ...data.movies]);
    setOnboarding(data.onboarding);
    setLoading(false);
  }

  async function voteMovie(movieId: number, vote: number) {
    const movie = movies.find((movie) => movie._id === movieId);
    if (!movie) return;

    const hadVote = !!movie.userVote;

    const stars = movie.userVote === vote ? undefined : vote;
    const hasVote = !!stars;

    server.post("/movies/vote", { movieId, stars });

    movie.userVote = stars;
    setMovies([...movies]);

    if (!_.isNull(onboarding)) {
      let increment = 0;
      if (!hadVote && hasVote) increment++;
      if (hadVote && !hasVote) increment--;

      const votes = onboarding.votes + increment;
      setOnboarding({ ...onboarding, votes });
    }
  }
}

function Header(props: { itemsCount: number; onboarding: Onboarding }) {
  if (props.onboarding) {
    return (
      <View style={[s.bgMedium, s.borderPrimary, s.b0, s.r3, s.my3, s.p3]}>
        <Text style={[s.textBold]}>
          <Text style={[s.textStrong]}>
            Avalie ao menos {props.onboarding.target} itens que já assistiu.
          </Text>{" "}
          Quanto mais itens avaliar, melhores recomendações vai receber. Você já
          avaliou <Text style={[s.textStrong]}>{props.onboarding.votes}</Text>{" "}
          filmes.
        </Text>

        {props.onboarding.votes >= props.onboarding.target && (
          <Pressable>
            <Text style={[s.textStrong, s.taCenter, s.py4]}>
              VER RECOMENDAÇÕES
            </Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <Text style={[s.text, s.my3]}>
      Ordenamos <Text style={s.textStrong}>{props.itemsCount}</Text> itens
      conforme o seu perfil
    </Text>
  );
}
