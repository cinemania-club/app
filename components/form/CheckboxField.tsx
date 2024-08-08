import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";

export default function (props: {
  label: string;
  checked: boolean;
  onCheck: () => void;
}) {
  return (
    <Pressable
      style={[s.row, s.aiCenter, s.g2]}
      onPress={() => props.onCheck()}
    >
      <MaterialCommunityIcons
        name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
        color={palette.primary}
        size={20}
      />
      <Text style={[s.text]}>{props.label}</Text>
    </Pressable>
  );
}
