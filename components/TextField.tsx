import React, { ReactNode } from "react";
import { TextInput, View } from "react-native";
import s from "../src/theme/styles";

export default function (props: { placeholder: string; children?: ReactNode }) {
  return (
    <View
      style={[s.row, s.jcBetween, s.aiCenter, s.pb1, s.bb1, s.borderPrimary]}
    >
      <TextInput placeholder={props.placeholder} style={[s.text, s.italic]} />
      {props.children}
    </View>
  );
}
