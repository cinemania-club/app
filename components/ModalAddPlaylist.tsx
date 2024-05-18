import { StyleSheet, Text, View } from "react-native";
import s from "../src/theme/styles";

import { palette } from "../src/theme/colors";

import { Ionicons } from "@expo/vector-icons";

import React from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import Overlay from "./Overlay";

export default function () {
  return (
    <Overlay>
      <View style={[styles.poster, s.bgLight, s.r4, s.g4, s.p4]}>
        <Text style={[s.textStrong]}>Adicione à playlist</Text>
        <CheckBoxComponent title="Assistir mais tarde" />
        <CheckBoxComponent title="Arquivados" />
        <CheckBoxComponent title="Filmes para assistir com mozão" />
        <CheckBoxComponent title="Para rir" />
        <View style={[s.row, s.aiCenter, s.g1]}>
          <Ionicons name="add-sharp" size={30} color={palette.primary} />
          <Text style={[s.textPrimary]}>Nova playlist</Text>
        </View>
        <Text style={[s.textPrimary, s.taCenter, { fontWeight: "bold" }]}>
          OK
        </Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  poster: {
    resizeMode: "cover",
    marginHorizontal: "auto",
    marginVertical: "auto",
    width: "85%",
  },
});
