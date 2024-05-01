import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { icons: string[] }) {
  const topIcons = props.icons.filter((_, index) => index % 2 === 1);
  const bottomIcons = props.icons.filter((_, index) => index % 2 === 0);

  return (
    <Pressable
      style={[
        { width: 48, height: 48 },
        s.rounded,
        s.bgAccent,
        s.m4,
        s.aiCenter,
        s.jcCenter,
      ]}
    >
      <View style={[s.row]}>
        {topIcons.map((e) => (
          <MaterialCommunityIcons name={e} size={16} color={palette.text} />
        ))}
      </View>
      <View style={[s.row]}>
        {bottomIcons.map((e) => (
          <MaterialCommunityIcons name={e} size={16} color={palette.text} />
        ))}
      </View>
    </Pressable>
  );
}
