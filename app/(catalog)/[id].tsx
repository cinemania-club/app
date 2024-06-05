import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";

import DrawerFrame from "../../components/DrawerFrame";
import { MOVIE_GENRES } from "../../src/filters";
import { useServer } from "../../src/hooks";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";
import { ItemDetailsData } from "../../src/types";
import { brNumber } from "../../src/util";

type ItemDetailsResponse = {
  item: ItemDetailsData;
};

export default function () {
  const { id } = useLocalSearchParams();

  const [item, setItem] = useState<ItemDetailsData>();

  const server = useServer();

  useEffect(() => {
    getItemDetails();
  }, []);

  if (!item) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  const mapGenres = item.genres
    .map((genreId) => {
      const genre = MOVIE_GENRES.find((g) => g.value === genreId);
      return genre ? genre.label : null;
    })
    .filter((genre) => genre !== null);

  return (
    <DrawerFrame title={item.title} back>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w1280${item.backdropPath}`,
        }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#454545c0", "#000000ff"]}
          style={[s.p4, s.g3]}
        >
          <View style={[s.mx4, s.g3]}>
            <Text style={[s.textStrong, { fontSize: 14 }]}>{item.title}</Text>
            <View style={[s.row, s.g3]}>
              {mapGenres.map((item) => (
                <Text style={[s.text]}>{item}</Text>
              ))}
            </View>

            <View style={[s.row, s.aiCenter, s.g3]}>
              <View style={[s.row, s.g3]}>
                <Text style={[s.text]}>{getYear(item.firstAirDate)}</Text>
                <Text style={[s.text]}>{item.runtime} mins</Text>
              </View>
              <View style={[s.row, s.g1, s.aiCenter]}>
                <MaterialCommunityIcons
                  name="alpha-n-box"
                  size={26}
                  color="black"
                />
                <MaterialCommunityIcons
                  name="alpha-n-box"
                  size={26}
                  color="black"
                />
                <MaterialCommunityIcons
                  name="alpha-n-box"
                  size={26}
                  color="black"
                />
                <MaterialCommunityIcons
                  name="alpha-n-box"
                  size={26}
                  color="black"
                />
              </View>
            </View>

            <View style={[s.row, s.jcBetween]}>
              <Text style={[s.text]}>
                <Text style={[s.textStrong]}>90%</Text> indicado
              </Text>
              <Rating
                label="Seguidos:"
                stars={item.ratings.user}
                color={palette.text}
              />
              <Rating
                label="Geral:"
                stars={item.ratings.general}
                color={palette.text}
              />
            </View>
          </View>
          <View style={[s.row, s.aiCenter, s.jcBetween, s.bgLight, s.p3, s.r3]}>
            <MaterialIcons
              name="bookmark-outline"
              size={20}
              color={palette.primary}
            />
            <View style={[s.row, s.aiCenter, s.jcBetween, s.g2]}>
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={palette.primary}
              />
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={palette.primary}
              />
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={palette.primary}
              />
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={palette.primary}
              />
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={palette.primary}
              />
            </View>
            <View style={[s.row, s.aiCenter, s.g4]}>
              <MaterialCommunityIcons
                name="comment-processing"
                size={18}
                color={palette.primary}
              />
              <MaterialCommunityIcons
                name="alert-octagon-outline"
                size={20}
                color={palette.primary}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </DrawerFrame>
  );

  async function getItemDetails() {
    const response = await server.get<ItemDetailsResponse>(`/catalog/${id}`);
    setItem(response.data.item);
  }
}

function Rating(props: { label: string; stars?: number; color: string }) {
  const stars = props.stars ? brNumber(props.stars, 3) : "-";

  return (
    <View style={[s.row, s.aiCenter, s.g1]}>
      <Text style={[s.text, { color: props.color }]}>{props.label}</Text>
      <MaterialIcons name="star" size={16} color={props.color} />
      <Text style={[s.text, { color: props.color }]}>{stars}</Text>
    </View>
  );
}
