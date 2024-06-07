import { MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import React, { useContext } from "react";
import { Pressable, View } from "react-native";

import { CatalogItemContext } from "../src/contexts";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function () {
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
