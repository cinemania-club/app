import { ReactNode } from "react";
import { Pressable, View } from "react-native";

import s from "../src/theme/styles";

export default function (props: { icons: ReactNode[] }) {
  const topIcons = props.icons.filter((_, index) => index % 2 === 1);
  const bottomIcons = props.icons.filter((_, index) => index % 2 === 0);

  return (
    <Pressable
      style={[
        { width: 48, height: 48 },
        s.rounded,
        s.bgAccent,
        s.m4,
        s.aiCenter,
        s.jcCenter,
        s.g2,
      ]}
    >
      <View style={[s.row, s.g2]}>{topIcons}</View>
      <View style={[s.row, s.g2]}>{bottomIcons}</View>
    </Pressable>
  );
}
