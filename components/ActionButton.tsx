import React, { ReactElement } from "react";
import { Pressable, Text } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: {
  icon: ReactElement;
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const icon = React.cloneElement(props.icon, {
    size: 20,
    color: palette.text,
  });

  return (
    <Pressable
      style={[
        props.disabled ? s.bgLight : s.bgAccent,
        s.r3,
        s.row,
        s.aiCenter,
        s.jcCenter,
        s.p3,
        s.g3,
      ]}
      onPress={() => props.onPress()}
    >
      {icon}
      <Text style={[s.textBold, { fontSize: 14 }]}>{props.title}</Text>
    </Pressable>
  );
}
