import { Pressable, Text, View } from "react-native";
import s from "../src/theme/styles";

import { palette } from "../src/theme/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import CheckBox from "./CheckBox";
import Overlay from "./Overlay";
import TextField from "./TextField";

export default function (props: { onClose: () => void }) {
  const [createPlaylist, setCreatePlaylist] = useState(false);

  return (
    <Overlay>
      <View style={[s.aiCenter, s.jcCenter, s.flex1, s.p4]}>
        <View style={[s.bgLight, s.r4, s.g4, s.p4, { maxWidth: 400 }]}>
          <Text style={[s.textStrong]}>Adicione à playlist</Text>

          <CheckBox label="Assistir mais tarde" />
          <CheckBox label="Arquivados" />
          <CheckBox label="Filmes para assistir com mozao" />
          <CheckBox label="Para rir" />

          {createPlaylist ? (
            <TextField placeholder="Digite o nome da playlist">
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={palette.primary}
              />
            </TextField>
          ) : (
            <Pressable onPress={() => setCreatePlaylist(true)}>
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
            <Text style={[s.textStrong, s.taCenter]}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Overlay>
  );
}
