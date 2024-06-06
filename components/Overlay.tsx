import React, { ReactNode } from "react";
import { Modal, Pressable } from "react-native";

import s from "../src/theme/styles";

export default function (props: { children: ReactNode; onClose: () => void }) {
  return (
    <Modal transparent>
      <Pressable style={s.overlay} onPress={() => props.onClose()}>
        {props.children}
      </Pressable>
    </Modal>
  );
}
