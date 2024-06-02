import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import CheckBox from "./CheckBox";
import InfoArchived from "./InfoArchived";
import Modal from "./Modal";
import TextField from "./TextField";

export default function (props: { onClose: () => void }) {
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [openInfoArchived, setOpenInfoArchived] = useState(false);

  const playlists = ["Assistir com o mozão", "Terror", "Para rir"];

  return (
    <Modal>
      <Text style={[s.textStrong]}>Adicione à playlist</Text>

      <CheckBox label="Assistir mais tarde" />
      <View style={[s.row, s.aiCenter, s.g2]}>
        <CheckBox label="Arquivados" />
        <Pressable onPress={() => setOpenInfoArchived(true)}>
          <MaterialCommunityIcons
            name="information"
            size={14}
            color={palette.primary}
            style={[s.pressable]}
          />
        </Pressable>
      </View>

      {playlists.map((item) => {
        return <UserPlaylist item={item} />;
      })}

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

function UserPlaylist(props: { item: string }) {
  const [openInfoDelete, setOpenInfoDelete] = useState(false);

  return (
    <View style={[s.row, s.jcBetween, s.g2]}>
      <CheckBox label={props.item} />
      <Pressable style={[s.pressable]} onPress={() => setOpenInfoDelete(true)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color={palette.primary}
        />
      </Pressable>
      {openInfoDelete && (
        <DeletePlaylist
          onClose={() => setOpenInfoDelete(false)}
          onDelete={() => setOpenInfoDelete(false)}
          name={props.item}
        />
      )}
    </View>
  );
}

function DeletePlaylist(props: {
  onClose: () => void;
  onDelete: () => void;
  name: string;
}) {
  return (
    <Modal>
      <View style={[s.p3]}>
        <Text style={[s.textBold]}>
          Você tem certeza que deseja excluir a playlist "{props.name}"
        </Text>

        <View style={[s.row, s.jcBetween, s.mt4]}>
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
