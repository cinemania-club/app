import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { label: string }) {
  return (
    <View style={[s.row, s.aiCenter, s.g3]}>
      <MaterialCommunityIcons
        name="checkbox-blank-outline"
        size={24}
        color={palette.primary}
      />
      <Text style={[s.text]}>{props.label}</Text>
    </View>
  );
}
