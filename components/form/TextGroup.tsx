import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import s from "../../src/theme/styles";
import TextField from "./TextField";

export default function (props: {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hideText?: boolean;
  reverse?: boolean;
  children?: ReactNode;
  error?: string;
}) {
  return (
    <View style={[s.g2]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(text) => props.onChangeText(text)}
        hideText={props.hideText}
        reverse={props.reverse}
      >
        {props.children}
      </TextField>
      {props.error && <Text style={s.textPrimary}>{props.error}</Text>}
    </View>
  );
}
