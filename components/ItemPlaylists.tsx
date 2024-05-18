import { Text, View } from "react-native";
import s from "../src/theme/styles";

import { palette } from "../src/theme/colors";

import { Ionicons } from "@expo/vector-icons";

import React from "react";
import CheckBox from "./CheckBox";
import Overlay from "./Overlay";

export default function () {
  return (
    <Overlay>
      <View style={[s.aiCenter, s.jcCenter, s.flex1, s.p4]}>
        <View style={[s.bgLight, s.r4, s.g4, s.p4, { maxWidth: 400 }]}>
          <Text style={[s.textStrong]}>Adicione à playlist</Text>
          <CheckBox label="Assistir mais tarde" />
          <CheckBox label="Arquivados" />
          <CheckBox label="Filmes para assistir oioioi oioioioioi oioim mozão HHHHHHHHHHHHHHH HHHHHHHHHHHH HHHHHHHH HHHHHHH HHHHHH" />
          <CheckBox label="Para rir" />
          <View style={[s.row, s.aiCenter, s.g1]}>
            <Ionicons name="add-sharp" size={30} color={palette.primary} />
            <Text style={[s.textPrimary]}>Nova playlist</Text>
          </View>
          <Text style={[s.textPrimary, s.taCenter, { fontWeight: "bold" }]}>
            OK
          </Text>
        </View>
      </View>
    </Overlay>
  );
}
