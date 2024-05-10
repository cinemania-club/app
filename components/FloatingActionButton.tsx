import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactElement, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { FOOTER_HEIGHT } from "./DrawerFrame";
import Overlay from "./Overlay";

type Action = { text?: string; icon: ReactElement };

export default function (props: { actions: Action[] }) {
  const [expanded, setExpanded] = useState(false);

  return expanded ? (
    <Expanded actions={props.actions} collapse={() => setExpanded(false)} />
  ) : (
    <Collapsed actions={props.actions} expand={() => setExpanded(true)} />
  );
}

function Expanded(props: { actions: Action[]; collapse: () => void }) {
  return (
    <Overlay>
      <View
        style={[
          s.flex1,
          s.g3,
          s.p4,
          s.aiEnd,
          s.jcEnd,
          { marginBottom: FOOTER_HEIGHT },
        ]}
      >
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
              <View style={[s.row, s.g2]}>
                <Icon icon={e.icon} size={28} />
              </View>
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
          onPress={() => props.collapse()}
        >
          <View style={[s.row, s.g2]}>
            <MaterialCommunityIcons
              name="window-close"
              size={28}
              color={palette.text}
            />
          </View>
        </Pressable>
      </View>
    </Overlay>
  );
}

function Collapsed(props: { actions: Action[]; expand: () => void }) {
  const icons = props.actions.map((e, index) => (
    <Icon key={index} icon={e.icon} size={14} />
  ));

  const topIcons = icons.filter((_, index) => index % 2 === 1);
  const bottomIcons = icons.filter((_, index) => index % 2 === 0);

  return (
    <Pressable
      style={[
        {
          width: 48,
          height: 48,
          position: "absolute",
          right: 0,
          bottom: 0,
        },
        s.rounded,
        s.bgAccent,
        s.m4,
        s.aiCenter,
        s.jcCenter,
        s.g2,
      ]}
      onPress={() => props.expand()}
    >
      <View style={[s.row, s.g2]}>{topIcons}</View>
      <View style={[s.row, s.g2]}>{bottomIcons}</View>
    </Pressable>
  );
}

function Icon(props: { icon: ReactElement; size: number }) {
  return React.cloneElement(props.icon, {
    size: props.size,
    color: palette.text,
  });
}
