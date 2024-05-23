import { Pressable, Text, TextInput, View } from "react-native";
import s from "../src/theme/styles";

import { palette } from "../src/theme/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import CheckBox from "./CheckBox";
import Overlay from "./Overlay";

export default function (props: { onClose: () => void }) {
  const [showTextInput, setShowTextInput] = useState(false);

  return (
    <Overlay>
      <View style={[s.aiCenter, s.jcCenter, s.flex1, s.p4]}>
        <View style={[s.bgLight, s.r4, s.g4, s.p4, { maxWidth: 400 }]}>
          <Text style={[s.textStrong]}>Adicione à playlist</Text>
          <CheckBox label="Assistir mais tarde" />
          <CheckBox label="Arquivados" />
          <CheckBox label="Filmes para assistir com mozao" />
          <CheckBox label="Para rir" />

          {showTextInput ? (
            <View
              style={[
                s.row,
                s.jcBetween,
                s.aiCenter,
                s.pb1,
                { borderBottomWidth: 2, borderBottomColor: palette.primary },
              ]}
            >
              <TextInput
                placeholder="Digite o nome da playlist"
                style={[
                  s.text,
                  {
                    fontStyle: "italic",
                    outline: "none",
                  },
                ]}
              />
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={palette.primary}
              />
            </View>
          ) : (
            <Pressable
              onPress={() => {
                setShowTextInput(!showTextInput);
                console.log(showTextInput);
              }}
            >
              <View style={[s.row, s.aiCenter, s.g1]}>
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={palette.primary}
                />
                <Text style={[s.textPrimary]}>Nova playlist</Text>
              </View>
            </Pressable>
          )}

          <Pressable onPress={() => props.onClose()}>
            <Text style={[s.textPrimary, s.taCenter, { fontWeight: "bold" }]}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Overlay>
  );
}
