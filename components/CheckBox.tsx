import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { title: string }) {
  return (
    <View style={[s.row, s.aiCenter, s.g3]}>
      <MaterialIcons
        name="check-box-outline-blank"
        size={24}
        color={palette.primary}
      />
      <Text style={[s.text]}>{props.title}</Text>
    </View>
  );
}
