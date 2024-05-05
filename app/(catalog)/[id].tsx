import { MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";

import DrawerFrame from "../../components/DrawerFrame";
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

  const genres = item.genres.join("/");

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
          style={[s.p5, s.g3]}
        >
          <Text style={[s.textStrong, { fontSize: 14 }]}>{item.title}</Text>
          <Text style={[s.text]}>{genres}</Text>

          <View style={[s.row, s.g3]}>
            <Text style={[s.text]}>{getYear(item.firstAirDate)}</Text>
            <Text style={[s.text]}>{item.runtime} mins</Text>
          </View>

          <View style={[s.row, s.jcBetween]}>
            <Rating
              label="Geral"
              stars={item.ratings.general}
              color={palette.primary}
            />
            <Rating label="Amigos" color={palette.text} />
            <Rating
              label="Você"
              stars={item.ratings.user}
              color={palette.text}
            />
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
