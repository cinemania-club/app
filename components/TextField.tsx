import React, { ReactNode, useState } from "react";
import { TextInput, View } from "react-native";
import s from "../src/theme/styles";

export default function (props: {
  placeholder: string;
  children?: ReactNode;
  reverse?: boolean;
}) {
  const [value, setValue] = useState("");

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
        style={[s.text, !value && s.italic, s.flex1, { outline: "none" }]}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      {props.children}
    </View>
  );
}
