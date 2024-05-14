import React from "react";
import { Modal, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { visible: boolean }) {
  return (
    <Modal visible={props.visible}>
      <View style={[s.bgDark, s.flex1, s.p3]}>
        <View style={[s.bgMedium, s.flex1, s.r4, s.p4]}>
          <View style={[s.row, s.aiCenter, s.g3]}>
            <MaterialCommunityIcons
              name="filter"
              color={palette.primary}
              size={20}
            />
            <Text style={[s.textStrong, { fontSize: 16 }]}>Filtrar Lista</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
