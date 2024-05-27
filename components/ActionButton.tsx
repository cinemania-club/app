import React from "react";
import { Pressable, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { disabled?: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[
        props.disabled ? s.bgLight : s.bgAccent,
        s.r3,
        s.row,
        s.aiCenter,
        s.jcCenter,
        s.p3,
        s.g3,
      ]}
      onPress={() => props.onPress()}
    >
      <MaterialCommunityIcons name="filter" color={palette.text} size={20} />
      <Text style={[s.textBold, { fontSize: 14 }]}>Filtrar Catálogo</Text>
    </Pressable>
  );
}
