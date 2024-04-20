import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { children: ReactNode; title: string }) {
  const nav = useNavigation();

  return (
    <View style={s.flex1}>
      <View style={s.flex1}>{props.children}</View>

      <View style={[s.bgPrimary, s.row, s.aiCenter, s.px5, s.py3]}>
        <Pressable onPress={() => nav.dispatch(DrawerActions.openDrawer())}>
          <MaterialIcons name="menu" size={40} color={palette.text} />
        </Pressable>

        <Text style={[s.flex1, s.textBold, s.taCenter, { fontSize: 16 }]}>
          {props.title}
        </Text>

        <Pressable style={s.pressable} onPress={() => {}}>
          <MaterialIcons name="search" size={28} color={palette.text} />
        </Pressable>
      </View>
    </View>
  );
}
