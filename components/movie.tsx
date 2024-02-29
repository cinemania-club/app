import { Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { getYear } from "date-fns";
import { Image, StyleSheet, View } from "react-native";

import { brNumber } from "../app/util";
import { gluestackUIConfig } from "../config/gluestack-ui.config";

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
};

type Props = {
  movieData: Movie;
};

export default function MovieCard(props: Props) {
  const movie = props.movieData;
  const textColor = gluestackUIConfig.tokens.colors.text;
  const primaryColor = gluestackUIConfig.tokens.colors.primary

  return (
    <View style={styles.card}>
      <HStack>
        <Image
          resizeMode="cover"
          height={128}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          style={{ aspectRatio: 2 / 3 }}
        />
        <VStack bg="$mediumBackground" p="$3" space="sm" flex={1}>
          <Text bold color="$primary" size="xs">
            {movie.title}
          </Text>
          <HStack space="md" alignItems="center">
            <Text color="$text" size="xs">
              Drama
            </Text>
            <Text color="$text" size="xs">
              {getYear(movie.release_date)}
            </Text>
            <Text color="$text" size="xs">
              {movie.runtime} min
            </Text>
            <HStack space="xs" alignItems="center">
              <Entypo name="star" size={16} color={textColor} />
              <Text color="$text" size="xs">
                {brNumber(movie.vote_average, 3)}
              </Text>
            </HStack>
          </HStack>
          <HStack space="xs">
            <Avatar size="xs">
              <AvatarFallbackText>F</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
                }}
              />
            </Avatar>
            <Avatar size="xs">
              <AvatarFallbackText>F</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
                }}
              />
            </Avatar>
          </HStack>
        </VStack>
      </HStack>
      <HStack bg="$lightBackground" p="$4" justifyContent="center" space="4xl">
        <Entypo name="star-outlined" size={24} color={primaryColor} />
        <Fontisto name="favorite" size={24} color={primaryColor} />
        <MaterialIcons name="keyboard-arrow-down" size={24} color={primaryColor} />
        <MaterialIcons name="info-outline" size={24} color={primaryColor} />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 16,
    margin: 16,
  },
});
