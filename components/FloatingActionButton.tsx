import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "react-native";

import Overlay from "./Overlay";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type Action = { text?: string; icon: ReactNode };

export default function (props: { actions: Action[] }) {
  const [expanded, setExpanded] = useState(true);

  const topIcons = props.actions
    .filter((_, index) => index % 2 === 1)
    .map((e) => e.icon);
  const bottomIcons = props.actions
    .filter((_, index) => index % 2 === 0)
    .map((e) => e.icon);

  if (expanded) {
    return (
      <Overlay>
        <View style={[s.g3, s.m4, s.aiEnd]}>
          {props.actions.map((e) => (
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
            onPress={() => setExpanded(false)}
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
      </Overlay>
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
