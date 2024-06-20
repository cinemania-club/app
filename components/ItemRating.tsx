import { MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import React from "react";
import { Pressable, View } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: {
  stars: number | undefined;
  rate: (stars: number) => void;
}) {
  return (
    <View style={[s.row, s.g4]}>
      {_.range(1, 6).map((stars) => (
        <Pressable
          key={stars}
          style={[s.pressable]}
          onPress={() => props.rate(stars)}
        >
          <MaterialIcons
            name={props.stars && stars <= props.stars ? "star" : "star-border"}
            size={20}
            color={palette.primary}
          />
        </Pressable>
      ))}
    </View>
  );
}
