import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CatalogItemContext } from "../src/contexts";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { PlaylistType } from "../src/types";
import CheckBox from "./CheckBox";
import InfoArchived from "./InfoArchived";
import Modal from "./Modal";
import TextField from "./TextField";

export default function (props: { onClose: () => void }) {
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [openInfoArchived, setOpenInfoArchived] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const { playlists, addPlaylist } = useContext(CatalogItemContext)!;

  const server = useServer();

  return (
    <Modal>
      <Text style={[s.textStrong]}>Adicione à playlist</Text>

      {playlists
        .filter((playlist) => playlist.type === PlaylistType.WATCH_LATER)
        .map((playlist) => (
          <CheckBox label={playlist.name} />
        ))}
      {playlists
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

      {playlists
        .filter((playlist) => playlist.type === PlaylistType.CUSTOM)
        .map((playlist) => (
          <CustomPlaylist name={playlist.name} />
        ))}

      {openInfoArchived && (
        <InfoArchived onClose={() => setOpenInfoArchived(false)} />
      )}

      {creatingPlaylist ? (
        <TextField
          placeholder="Digite o nome da playlist"
          onChangeText={(text) => setPlaylistName(text)}
        >
          <Pressable onPress={() => createPlaylist()}>
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={palette.primary}
            />
          </Pressable>
        </TextField>
      ) : (
        <Pressable onPress={() => setCreatingPlaylist(true)}>
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

  async function createPlaylist() {
    const response = await server.post<{ id: string }>("/playlists", {
      name: playlistName,
    });
    addPlaylist(response.data.id, playlistName);
  }
}

function CustomPlaylist(props: { name: string }) {
  const [openDeletePlaylist, setOpenDeletePlaylist] = useState(false);

  return (
    <View style={[s.row, s.jcBetween, s.g2]}>
      <CheckBox label={props.name} />
      <Pressable
        style={[s.pressable]}
        onPress={() => setOpenDeletePlaylist(true)}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color={palette.primary}
        />
      </Pressable>
      {openDeletePlaylist && (
        <DeletePlaylist
          name={props.name}
          onClose={() => setOpenDeletePlaylist(false)}
          onDelete={() => setOpenDeletePlaylist(false)}
        />
      )}
    </View>
  );
}

function DeletePlaylist(props: {
  name: string;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <Modal>
      <View style={[s.p3, s.g4]}>
        <Text style={[s.textBold]}>
          Você tem certeza que deseja excluir a playlist "{props.name}"
        </Text>

        <View style={[s.row, s.jcBetween]}>
          <Pressable onPress={() => props.onClose()}>
            <Text style={[s.textStrong]}>CANCELAR</Text>
          </Pressable>
          <Pressable onPress={() => props.onDelete()}>
            <Text style={[s.textStrong]}>EXCLUIR</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
