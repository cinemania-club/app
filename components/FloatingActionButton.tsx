import { ReactNode, useState } from "react";
import { Pressable, View } from "react-native";

import s from "../src/theme/styles";

export default function (props: { icons: ReactNode[] }) {
  const [expanded, setExpanded] = useState(true);

  const topIcons = props.icons.filter((_, index) => index % 2 === 1);
  const bottomIcons = props.icons.filter((_, index) => index % 2 === 0);

  if (expanded) {
    return (
      <View style={[s.g3, s.m4]}>
        <Pressable
          style={[
            { width: 48, height: 48 },
            s.rounded,
            s.bgAccent,
            s.aiCenter,
            s.jcCenter,
            s.g2,
          ]}
          onPress={() => {}}
        >
          <View style={[s.row, s.g2]}>{topIcons}</View>
        </Pressable>

        <Pressable
          style={[
            { width: 48, height: 48 },
            s.rounded,
            s.bgAccent,
            s.aiCenter,
            s.jcCenter,
            s.g2,
          ]}
          onPress={() => {}}
        >
          <View style={[s.row, s.g2]}>{topIcons}</View>
        </Pressable>

        <Pressable
          style={[
            { width: 48, height: 48 },
            s.rounded,
            s.bgAccent,
            s.aiCenter,
            s.jcCenter,
            s.g2,
          ]}
          onPress={() => {}}
        >
          <View style={[s.row, s.g2]}>{topIcons}</View>
        </Pressable>

        <Pressable
          style={[
            { width: 48, height: 48 },
            s.rounded,
            s.bgAccent,
            s.aiCenter,
            s.jcCenter,
            s.g2,
          ]}
          onPress={() => {}}
        >
          <View style={[s.row, s.g2]}>{topIcons}</View>
        </Pressable>
      </View>
    );
  }

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
      onPress={() => setExpanded(true)}
    >
      <View style={[s.row, s.g2]}>{topIcons}</View>
      <View style={[s.row, s.g2]}>{bottomIcons}</View>
    </Pressable>
  );
}
