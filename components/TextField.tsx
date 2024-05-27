import React, { ReactNode } from "react";
import { TextInput, View } from "react-native";
import s from "../src/theme/styles";

export default function (props: { placeholder: string; children?: ReactNode }) {
  return (
    <View style={[s.row, s.aiCenter, s.g3, s.pb2, s.bb1, s.borderPrimary]}>
      <TextInput
        placeholder={props.placeholder}
        style={[s.text, s.italic, s.flex1, { outline: "none" }]}
      />
      {props.children}
    </View>
  );
}
