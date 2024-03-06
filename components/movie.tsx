import { Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { getYear } from "date-fns";
import React, { useState } from "react";
import { Image } from "react-native";

import { brNumber } from "../app/util";
import { gluestackUIConfig } from "../config/gluestack-ui.config";

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
  overview: string;
};

type Props = {
  movieData: Movie;
};

export default function MovieCard(props: Props) {
  const movie = props.movieData;
  const textColor = gluestackUIConfig.tokens.colors.text;
  const primaryColor = gluestackUIConfig.tokens.colors.primary;

  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <VStack overflow="hidden" rounded="$md">
      <HStack>
        <Image
          resizeMode="cover"
          height={128}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          }}
          style={{ aspectRatio: 2 / 3 }}
          alt="Capa do filme"
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
                alt="Nome do amigo"
              />
            </Avatar>
            <Avatar size="xs">
              <AvatarFallbackText>F</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
                }}
                alt="Nome do amigo"
              />
            </Avatar>
          </HStack>
        </VStack>
      </HStack>

      {showSynopsis && (
        <Box bg="$lightBackground" p="$4">
          <Text color="$text" size="sm">
            {movie.overview}
          </Text>
        </Box>
      )}

      <HStack bg="$lightBackground" p="$3" justifyContent="center" space="4xl">
        <Entypo name="star-outlined" size={24} color={primaryColor} />
        <Fontisto name="favorite" size={24} color={primaryColor} />
        <Pressable onPress={() => setShowSynopsis(!showSynopsis)}>
          <MaterialIcons
            name={showSynopsis ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={primaryColor}
          />
        </Pressable>
        <MaterialIcons name="info-outline" size={24} color={primaryColor} />
      </HStack>
    </VStack>
  );
}
