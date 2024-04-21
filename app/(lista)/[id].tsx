import { MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";

import DrawerFrame from "../../components/DrawerFrame";
import { useServer } from "../../src/hooks";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";
import { MovieDetails } from "../../src/types";

type MovieDetailsResponse = {
  movie: MovieDetails;
};

export default function () {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState<MovieDetails>();

  const server = useServer();

  useEffect(() => {
    getMovieDetails();
  }, []);

  if (!movie) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  const genres = movie.genres.join("/");

  return (
    <DrawerFrame title={movie.title} back>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
        }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#454545c0", "#000000ff"]}
          style={[s.p5, s.g3]}
        >
          <Text style={[s.textStrong, { fontSize: 14 }]}>{movie.title}</Text>
          <Text style={[s.text]}>{genres}</Text>

          <View style={[s.row, s.g3]}>
            <Text style={[s.text]}>{getYear(movie.release_date)}</Text>
            <Text style={[s.text]}>{movie.runtime} mins</Text>
          </View>

          <View style={[s.row, s.jcBetween]}>
            <Vote label="Você:" vote={movie.userVote} color={palette.primary} />
            <Vote label="Amigos:" vote={0} color={palette.text} />
            <Vote label="Você:" vote={movie.userVote} color={palette.text} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </DrawerFrame>
  );

  async function getMovieDetails() {
    const response = await server.get<MovieDetailsResponse>(`/movies/${id}`);
    setMovie(response.data.movie);
  }
}

function Vote(props: { label: string; vote?: number; color: string }) {
  if (_.isUndefined(props.vote)) return null;

  return (
    <View style={[s.row, s.aiCenter, s.g1]}>
      <Text style={[s.text, { color: props.color }]}>{props.label}</Text>
      <MaterialIcons name="star" size={16} color={props.color} />
      <Text style={[s.text, { color: props.color }]}>{props.vote}</Text>
    </View>
  );
}
