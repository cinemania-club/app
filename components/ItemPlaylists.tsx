import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import CheckBox from "./CheckBox";
import DefaultModal from "./DefaultModal";
import InfoArchived from "./InfoArchived";
import TextField from "./TextField";

export default function (props: { onClose: () => void }) {
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [openModalArchived, setOpenModalArchived] = useState(false);

  return (
    <DefaultModal>
      <Text style={[s.textStrong]}>Adicione à playlist</Text>

      <CheckBox label="Assistir mais tarde" />
      <View style={[s.row, s.aiCenter, s.g2]}>
        <CheckBox label="Arquivados" />
        <Pressable
          onPress={() => {
            setOpenModalArchived(true);
          }}
        >
          <MaterialCommunityIcons
            name="information"
            size={14}
            color={palette.primary}
          />
        </Pressable>
      </View>
      <CheckBox label="Filmes para assistir com mozão" />
      <CheckBox label="Para rir" />

      {openModalArchived && (
        <InfoArchived
          onClose={() => {
            setOpenModalArchived(false);
          }}
        />
      )}

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
    </DefaultModal>
  );
}
