import React, { ReactNode } from "react";
import { View } from "react-native";

import s from "../src/theme/styles";
import Overlay from "./Overlay";

export default function (props: { children: ReactNode }) {
  return (
    <Overlay>
      <View style={[s.jcCenter, s.flex1, s.p4, s.aiCenter]}>
        <View style={[s.bgLight, s.r4, s.g4, s.p4, { maxWidth: 400 }]}>
          {props.children}
        </View>
      </View>
    </Overlay>
  );
}
