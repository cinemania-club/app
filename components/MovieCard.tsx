import { MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import _ from "lodash";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { brNumber } from "../app/util";
import { useServer } from "../hooks";
import { palette } from "../theme/colors";
import s from "../theme/styles";

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
  overview: string;
  userStars: number;
};

export default function (props: { movie: Movie }) {
  const movie = props.movie;

  return (
    <View style={[s.rounded3, s.bgMedium, { overflow: "hidden" }]}>
      <View style={s.row}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          alt="Capa do filme"
        />

        <MovieInfo movie={movie} />
      </View>

      <MovieActions movie={movie} />
    </View>
  );
}

function MovieInfo(props: { movie: Movie }) {
  const movie = props.movie;

  return (
    <View style={[s.p3, s.g3]}>
      <Text style={s.textStrong}>{movie.title}</Text>

      <View style={[s.row, s.aiCenter, s.g4]}>
        <Text style={s.text}>Drama</Text>
        <Text style={s.text}>{getYear(movie.release_date)}</Text>
        <Text style={s.text}>{movie.runtime} min</Text>

        <View style={[s.row, s.aiCenter, s.g1]}>
          <MaterialIcons name="star" size={16} color={palette.text} />
          <Text style={s.text}>{brNumber(movie.vote_average, 3)}</Text>
        </View>
      </View>

      <View style={[s.row, s.g2]}>
        <Image
          style={[styles.avatar, s.rounded]}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          alt="Nome do amigo"
        />
        <Image
          style={[styles.avatar, s.rounded]}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          alt="Nome do amigo"
        />
      </View>
    </View>
  );
}

function MovieActions(props: { movie: Movie }) {
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <View style={[s.bgLight, s.p3, s.g3]}>
      {showSynopsis && <Text style={[s.text]}>{props.movie.overview}</Text>}

      <View style={[s.row, s.aiCenter, s.jcBetween, s.g4]}>
        <MovieVote movie={props.movie} />

        <View style={[s.row, s.aiCenter, s.g4]}>
          <MaterialIcons
            name="bookmark-outline"
            size={20}
            color={palette.primary}
          />

          <Pressable
            style={[s.pressable]}
            onPress={() => setShowSynopsis(!showSynopsis)}
          >
            <MaterialIcons
              name={showSynopsis ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color={palette.primary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MovieVote(props: { movie: Movie }) {
  const server = useServer();

  return (
    <View style={[s.row, s.g4]}>
      {_.range(1, 6).map((stars) => (
        <Pressable
          style={[s.pressable]}
          onPress={() => vote(props.movie._id, stars)}
        >
          <MaterialIcons
            name={stars <= props.movie.userStars ? "star" : "star-border"}
            size={20}
            color={palette.primary}
          />
        </Pressable>
      ))}
    </View>
  );

  function vote(movieId: number, stars: number) {
    server.post("/movies/vote", { movieId, stars });
  }
}

const styles = StyleSheet.create({
  poster: {
    resizeMode: "cover",
    width: 75,
    aspectRatio: 2 / 3,
  },
  avatar: {
    width: 20,
    height: 20,
  },
});
