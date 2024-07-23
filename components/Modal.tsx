import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

import s from "../src/theme/styles";
import Overlay from "./Overlay";

export default function (props: {
  children: ReactNode;
  onClose: () => void;
  error?: boolean;
}) {
  return (
    <Overlay onClose={() => props.onClose()}>
      <View style={[s.jcCenter, s.flex1, s.p5, s.aiStretch]}>
        {/* Pressable is stopping propagation of clicks on the View element */}
        <Pressable onPress={() => {}}>
          <View
            style={[
              s.bgLight,
              s.r4,
              s.g5,
              s.p4,
              s.borderPrimary,
              props.error ? s.b0 : {},
            ]}
          >
            {props.children}
          </View>
        </Pressable>
      </View>
    </Overlay>
  );
}
