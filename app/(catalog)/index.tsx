import _ from "lodash";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import DrawerFrame from "../../components/DrawerFrame";
import MovieCard from "../../components/MovieCard";
import { MovieContext } from "../../src/contexts";
import { useServer } from "../../src/hooks";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";
import { Movie } from "../../src/types";

type CatalogResponse = {
  onboarding: Onboarding;
  total: number;
  items: Movie[];
};

type Onboarding = {
  votes: number;
  target: number;
} | null;

export default function () {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Movie[]>([]);
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
    <DrawerFrame title="Catálogo">
      <FlatList
        style={[s.flex1, s.p3]}
        contentContainerStyle={s.g3}
        data={items}
        stickyHeaderIndices={onboarding ? [0] : undefined}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={() => loadMovies()}
        ListHeaderComponent={() => (
          <Header total={total} onboarding={onboarding} />
        )}
        renderItem={({ item }) => (
          <MovieContext.Provider
            key={item._id}
            value={{ movie: item, vote: (stars) => rateItem(item._id, stars) }}
          >
            <MovieCard />
          </MovieContext.Provider>
        )}
      />
    </DrawerFrame>
  );

  async function loadMovies() {
    const response = await server.post<CatalogResponse>("/movies", {
      skip: items.map((item) => item._id),
    });

    const data = response.data;

    setTotal(data.total);
    setItems([...items, ...data.items]);
    setOnboarding(data.onboarding);
    setLoading(false);
  }

  async function rateItem(movieId: number, vote: number) {
    const movie = items.find((item) => item._id === movieId);
    if (!movie) return;

    const hadVote = !!movie.userVote;

    const stars = movie.userVote === vote ? undefined : vote;
    const hasVote = !!stars;

    server.post("/movies/vote", { movieId, stars });

    movie.userVote = stars;
    setItems([...items]);

    if (!_.isNull(onboarding)) {
      let increment = 0;
      if (!hadVote && hasVote) increment++;
      if (hadVote && !hasVote) increment--;

      const votes = onboarding.votes + increment;
      setOnboarding({ ...onboarding, votes });
    }
  }
}

function Header(props: { total: number; onboarding: Onboarding }) {
  if (props.onboarding) {
    return (
      <View style={[s.bgMedium, s.borderPrimary, s.b0, s.r3, s.my3, s.p3]}>
        <Text style={[s.textBold]}>
          <Text style={[s.textStrong]}>
            Avalie ao menos {props.onboarding.target} itens que já assistiu.
          </Text>{" "}
          Quanto mais itens avaliar, melhores recomendações vai receber. Você já
          avaliou <Text style={[s.textStrong]}>{props.onboarding.votes}</Text>{" "}
          {props.onboarding.votes === 1 ? "filme" : "filmes"}.
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
      Ordenamos <Text style={s.textStrong}>{props.total}</Text>{" "}
      {props.total === 1 ? "item" : "itens"} conforme o seu perfil
    </Text>
  );
}
