import React from "react";
import { Modal, View } from "react-native";

import s from "../src/theme/styles";

export default function () {
  return (
    <Modal>
      <View style={[s.bgDark, s.flex1, s.p3]}>
        <View style={[s.bgMedium, s.flex1, s.r4]} />
      </View>
    </Modal>
  );
}
