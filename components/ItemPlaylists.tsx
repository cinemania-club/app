import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CatalogItemContext } from "../src/contexts";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { Playlist, PlaylistType } from "../src/types";
import CheckboxField from "./form/CheckboxField";
import TextField from "./form/TextField";
import InfoArchived from "./InfoArchived";
import Modal from "./Modal";

export default function (props: { onClose: () => void }) {
  const { item, playlists, addPlaylist, setItemPlaylists } =
    useContext(CatalogItemContext)!;

  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [openInfoArchived, setOpenInfoArchived] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [checkedPlaylists, setCheckedPlaylists] = useState<string[]>(
    item.playlists,
  );

  const server = useServer();

  return (
    <Modal onClose={() => props.onClose()}>
      <View style={s.g4}>
        <Text style={[s.textStrong]}>Adicione à playlist</Text>

        {playlists
          .filter((playlist) => playlist.type === PlaylistType.WATCH_LATER)
          .map((playlist) => (
            <CheckboxField
              label={playlist.name}
              checked={checkedPlaylists.includes(playlist._id)}
              onCheck={() => togglePlaylist(playlist._id)}
            />
          ))}

        {playlists
          .filter((playlist) => playlist.type === PlaylistType.ARCHIVED)
          .map((playlist) => (
            <View style={[s.row, s.aiCenter, s.g2]}>
              <CheckboxField
                label={playlist.name}
                checked={checkedPlaylists.includes(playlist._id)}
                onCheck={() => togglePlaylist(playlist._id)}
              />
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
            <CustomPlaylist
              playlist={playlist}
              checked={checkedPlaylists.includes(playlist._id)}
              onCheck={() => togglePlaylist(playlist._id)}
            />
          ))}

        {openInfoArchived && (
          <InfoArchived onClose={() => setOpenInfoArchived(false)} />
        )}

        {creatingPlaylist ? (
          <TextField
            placeholder="Digite o nome da playlist"
            value={playlistName}
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

        <Pressable onPress={() => addItemToPlaylists()}>
          <Text style={[s.textStrong, s.taCenter]}>OK</Text>
        </Pressable>
      </View>
    </Modal>
  );

  function togglePlaylist(id: string) {
    const playlists = checkedPlaylists.includes(id)
      ? checkedPlaylists.filter((e) => e !== id)
      : [...checkedPlaylists, id];

    setCheckedPlaylists(playlists);
  }

  async function createPlaylist() {
    if (!playlistName) return;

    const response = await server.post<{ id: string }>("/playlists", {
      name: playlistName,
    });
    addPlaylist(response.data.id, playlistName);
    setCreatingPlaylist(false);
  }

  async function addItemToPlaylists() {
    await server.post<void>("/playlists/add", {
      itemId: item._id,
      playlists: checkedPlaylists,
    });
    setItemPlaylists(checkedPlaylists);
    props.onClose();
  }
}

function CustomPlaylist(props: {
  playlist: Playlist;
  checked: boolean;
  onCheck: () => void;
}) {
  const [openDeletePlaylist, setOpenDeletePlaylist] = useState(false);

  return (
    <View style={[s.row, s.jcBetween, s.g2]}>
      <CheckboxField
        label={props.playlist.name}
        checked={props.checked}
        onCheck={() => props.onCheck()}
      />
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
          playlist={props.playlist}
          onClose={() => setOpenDeletePlaylist(false)}
        />
      )}
    </View>
  );
}

function DeletePlaylist(props: { playlist: Playlist; onClose: () => void }) {
  const { deletePlaylist } = useContext(CatalogItemContext)!;

  const server = useServer();

  return (
    <Modal onClose={() => props.onClose()}>
      <View style={[s.p3, s.g4]}>
        <Text style={[s.textBold]}>
          Você tem certeza que deseja excluir a playlist "{props.playlist.name}"
        </Text>

        <View style={[s.row, s.jcBetween]}>
          <Pressable onPress={() => props.onClose()}>
            <Text style={[s.textStrong]}>CANCELAR</Text>
          </Pressable>

          <Pressable onPress={() => onDelete()}>
            <Text style={[s.textStrong]}>EXCLUIR</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  async function onDelete() {
    await server.delete(`/playlists/${props.playlist._id}`);
    deletePlaylist(props.playlist._id);
    props.onClose();
  }
}
