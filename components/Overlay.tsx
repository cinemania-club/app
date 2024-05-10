import React, { ReactNode } from "react";
import { Modal, View } from "react-native";

import s from "../src/theme/styles";

export default function (props: { children: ReactNode }) {
  return (
    <Modal transparent>
      <View style={s.overlay}>{props.children}</View>
    </Modal>
  );
}
