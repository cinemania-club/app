import { MaterialIcons } from "@expo/vector-icons";
import { getYear } from "date-fns";
import { router } from "expo-router";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { CatalogItemContext } from "../src/contexts";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { brNumber } from "../src/util";
import ItemPlaylists from "./ItemPlaylists";

export default function () {
  const { item } = useContext(CatalogItemContext)!;

  return (
    <Pressable onPress={() => router.push(`/${item._id}`)}>
      <View style={[s.r3, s.bgMedium, { overflow: "hidden" }]}>
        <View style={s.row}>
          <Image
            style={styles.poster}
            source={{
              uri: `https://image.tmdb.org/t/p/w185${item.posterPath}`,
            }}
            alt="Capa do filme"
          />

          <ItemInfo />
        </View>

        <ItemActions />
      </View>
    </Pressable>
  );
}

function ItemInfo() {
  const { item } = useContext(CatalogItemContext)!;

  return (
    <View style={[s.p3, s.g3]}>
      <Text style={s.textStrong}>{item.title}</Text>

      <View style={[s.row, s.aiCenter, s.g4]}>
        <Text style={s.text}>Drama</Text>
        <Text style={s.text}>{getYear(item.firstAirDate)}</Text>
        <Text style={s.text}>{item.runtime} min</Text>

        <View style={[s.row, s.aiCenter, s.g1]}>
          <MaterialIcons name="star" size={16} color={palette.text} />
          <Text style={s.text}>{brNumber(item.ratings.general, 3)}</Text>
        </View>
      </View>

      <View style={[s.row, s.g2]}>
        <Image
          style={[styles.avatar, s.rounded]}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${item.posterPath}`,
          }}
          alt="Nome do amigo"
        />
        <Image
          style={[styles.avatar, s.rounded]}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${item.posterPath}`,
          }}
          alt="Nome do amigo"
        />
      </View>
    </View>
  );
}

function ItemActions() {
  const { item, showOverview } = useContext(CatalogItemContext)!;

  const [showItemPlaylists, setShowItemPlaylists] = useState(false);

  return (
    <View style={[s.bgLight, s.p3, s.g3]}>
      {item.showOverview && <Text style={[s.text]}>{item.overview}</Text>}

      <View style={[s.row, s.aiCenter, s.jcBetween, s.g4]}>
        <ItemRating />

        <View style={[s.row, s.aiCenter, s.g4]}>
          <Pressable
            style={[s.pressable]}
            onPress={() => setShowItemPlaylists(true)}
          >
            <MaterialIcons
              name="bookmark-outline"
              size={20}
              color={palette.primary}
            />
          </Pressable>
          {showItemPlaylists && (
            <ItemPlaylists onClose={() => setShowItemPlaylists(false)} />
          )}

          <Pressable
            style={[s.pressable]}
            onPress={() => showOverview(!item.showOverview)}
          >
            <MaterialIcons
              name={
                item.showOverview ? "keyboard-arrow-up" : "keyboard-arrow-down"
              }
              size={24}
              color={palette.primary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ItemRating() {
  const { item, rate } = useContext(CatalogItemContext)!;

  return (
    <View style={[s.row, s.g4]}>
      {_.range(1, 6).map((stars) => (
        <Pressable
          key={stars}
          style={[s.pressable]}
          onPress={() => rate(stars)}
        >
          <MaterialIcons
            name={
              item.ratings.user && stars <= item.ratings.user
                ? "star"
                : "star-border"
            }
            size={20}
            color={palette.primary}
          />
        </Pressable>
      ))}
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
