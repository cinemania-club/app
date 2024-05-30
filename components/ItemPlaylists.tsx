import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CatalogItemContext } from "../src/contexts";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { PlaylistType } from "../src/types";
import CheckBox from "./CheckBox";
import InfoArchived from "./InfoArchived";
import Modal from "./Modal";
import TextField from "./TextField";

export default function (props: { onClose: () => void }) {
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [openInfoArchived, setOpenInfoArchived] = useState(false);

  const { item } = useContext(CatalogItemContext)!;

  return (
    <Modal>
      <Text style={[s.textStrong]}>Adicione à playlist</Text>

      {item.playlists
        .filter((playlist) => playlist.type === PlaylistType.WATCH_LATER)
        .map((playlist) => (
          <CheckBox label={playlist.name} />
        ))}

      {item.playlists
        .filter((playlist) => playlist.type === PlaylistType.ARCHIVED)
        .map((playlist) => (
          <View style={[s.row, s.aiCenter, s.g2]}>
            <CheckBox label={playlist.name} />
            <Pressable onPress={() => setOpenInfoArchived(true)}>
              <MaterialCommunityIcons
                name="information"
                size={14}
                color={palette.primary}
                style={[s.pressable]}
              />
            </Pressable>
          </View>
        ))}

      {item.playlists
        .filter((playlist) => playlist.type === PlaylistType.CUSTOM)
        .map((playlist) => (
          <>
            <CheckBox label={playlist.name} />
            <Text>Lixeira</Text>
          </>
        ))}

      {openInfoArchived && (
        <InfoArchived onClose={() => setOpenInfoArchived(false)} />
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
    </Modal>
  );
}
