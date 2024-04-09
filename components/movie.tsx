import { Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { brNumber } from "../app/util";
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
};

export default function MovieCard(props: { movie: Movie }) {
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
          <Entypo name="star" size={16} color={palette.text} />
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
    <View style={[s.bgLight]}>
      {showSynopsis && (
        <Text style={[s.text, s.p3]}>{props.movie.overview}</Text>
      )}

      <View style={[s.row, s.jcCenter, s.p3, s.g4]}>
        <Entypo name="star-outlined" size={24} color={palette.primary} />
        <Fontisto name="favorite" size={24} color={palette.primary} />
        <Pressable onPress={() => setShowSynopsis(!showSynopsis)}>
          <MaterialIcons
            name={showSynopsis ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={palette.primary}
          />
        </Pressable>
        <MaterialIcons name="info-outline" size={24} color={palette.primary} />
      </View>
    </View>
  );
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
