import { ReactNode } from "react";
import { View } from "react-native";

import s from "../src/theme/styles";

export default function (props: { children: ReactNode }) {
  return (
    <View
      style={[
        {
          backgroundColor: "rgba(0,0,0,0.8)",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        s.jcEnd,
        s.aiEnd,
      ]}
    >
      {props.children}
    </View>
  );
}
