import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import Modal from "./Modal";

export default function (props: { message: string; onClose: () => void }) {
  return (
    <Modal error onClose={() => props.onClose()}>
      <View style={[s.row, s.g3]}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={18}
          color={palette.primary}
        />
        <Text style={[s.textPrimary]}>{props.message}</Text>
      </View>
      <Pressable onPress={() => props.onClose()}>
        <Text style={[s.textStrong, s.taCenter]}>OK</Text>
      </Pressable>
    </Modal>
  );
}
