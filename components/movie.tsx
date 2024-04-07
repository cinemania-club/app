import { Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { brNumber } from "../app/util";
import colors from "../theme/colors";
import s from "../theme/spaces";
import ss from "../theme/styles";

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
  overview: string;
};

export default function MovieCard(props: { movie: Movie }) {
  const movie = props.movie;

  return (
    <View style={styles.card}>
      <View style={ss.row}>
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
      <Text style={ss.text.strong}>{movie.title}</Text>

      <View style={[ss.row, ss.ai.center, s.g4]}>
        <Text style={ss.text._}>Drama</Text>
        <Text style={ss.text._}>{getYear(movie.release_date)}</Text>
        <Text style={ss.text._}>{movie.runtime} min</Text>

        <View style={[ss.row, ss.ai.center, s.g1]}>
          <Entypo name="star" size={16} color={colors.text} />
          <Text style={ss.text._}>{brNumber(movie.vote_average, 3)}</Text>
        </View>
      </View>

      <View style={[ss.row, s.g2]}>
        <Image
          style={styles.avatar}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          alt="Nome do amigo"
        />
        <Image
          style={styles.avatar}
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
    <View style={styles.actions}>
      {showSynopsis && (
        <Text style={[ss.text._, s.p3]}>{props.movie.overview}</Text>
      )}

      <View style={[ss.row, ss.jc.center, s.p3, s.g4]}>
        <Entypo name="star-outlined" size={24} color={colors.primary} />
        <Fontisto name="favorite" size={24} color={colors.primary} />
        <Pressable onPress={() => setShowSynopsis(!showSynopsis)}>
          <MaterialIcons
            name={showSynopsis ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={colors.primary}
          />
        </Pressable>
        <MaterialIcons name="info-outline" size={24} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.medium,
    borderRadius: 8,
    overflow: "hidden",
  },
  poster: {
    resizeMode: "cover",
    width: 75,
    aspectRatio: 2 / 3,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  actions: {
    backgroundColor: colors.bg.light,
  },
});
