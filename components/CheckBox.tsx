import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={[s.row, s.aiCenter, s.g3]}>
      <Pressable onPress={() => setChecked(!checked)}>
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
          size={22}
          color={palette.primary}
        />
      </Pressable>

      <Text style={[s.text]}>{props.label}</Text>
    </View>
  );
}
