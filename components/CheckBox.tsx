import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import DeletePlaylist from "./DeletePlaylist";

export default function (props: { label: string; playlistUser: boolean }) {
  const [checked, setChecked] = useState(false);
  const [openInfoDelete, setOpenInfoDelete] = useState(false);

  return (
    <View style={[s.row, s.aiCenter, s.g3]}>
      <Pressable onPress={() => setChecked(!checked)}>
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
          size={22}
          color={palette.primary}
        />
      </Pressable>

      <Text style={[s.text]}>{props.label}</Text>

      {props.playlistUser && (
        <Pressable
          style={[s.flex1, s.aiEnd]}
          onPress={() => setOpenInfoDelete(true)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color={palette.primary}
            style={[s.pressable]}
          />
        </Pressable>
      )}

      {openInfoDelete && (
        <DeletePlaylist
          namePlaylist={props.label}
          onClose={() => setOpenInfoDelete(false)}
          onDelete={() => setOpenInfoDelete(false)}
        />
      )}
    </View>
  );
}
