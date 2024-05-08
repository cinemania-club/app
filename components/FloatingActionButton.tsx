import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type FloatingActionButton = { text?: string; icon: ReactNode };

export default function (props: { icons: FloatingActionButton[] }) {
  const [expanded, setExpanded] = useState(true);

  const topIcons = props.icons.filter((_, index) => index % 2 === 1);
  const bottomIcons = props.icons.filter((_, index) => index % 2 === 0);

  if (expanded) {
    return (
      <View style={[s.g3, s.m4, s.aiEnd]}>
        {props.icons.map((e) => (
          <View style={[s.row, s.aiCenter, s.g3]}>
            <Text style={s.textBold}>{e.text}</Text>
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
              <View style={[s.row, s.g2]}>{e.icon}</View>
            </Pressable>
          </View>
        ))}

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
          <View style={[s.row, s.g2]}>
            <MaterialCommunityIcons
              name="window-close"
              size={30}
              color={palette.text}
            />
          </View>
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
      <View style={[s.row, s.g2]}>{topIcons.map((e) => e.icon)}</View>
      <View style={[s.row, s.g2]}>{bottomIcons.map((e) => e.icon)}</View>
    </Pressable>
  );
}
