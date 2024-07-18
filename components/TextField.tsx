import React, { ReactNode } from "react";
import { TextInput, View } from "react-native";
import s from "../src/theme/styles";

export default function (props: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hideText?: boolean;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <View
      style={[
        props.reverse ? s.rowReverse : s.row,
        s.aiCenter,
        s.g3,
        s.pb2,
        s.bb1,
        s.borderPrimary,
      ]}
    >
      <TextInput
        placeholder={props.placeholder}
        style={[s.text, !props.value && s.italic, s.flex1, { outline: "none" }]}
        value={props.value}
        onChangeText={(text) => props.onChangeText(text)}
        secureTextEntry={props.hideText}
      />
      {props.children}
    </View>
  );
}
