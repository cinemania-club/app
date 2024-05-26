import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Text, View } from "react-native";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { label: string; children?: ReactNode }) {
  const [changeName, setChangeName] = useState(false);

  return (
    <View style={[s.row, s.aiCenter, s.g3]}>
      {changeName ? (
        <MaterialCommunityIcons
          name="checkbox-marked"
          size={22}
          color={palette.primary}
          onPress={() => setChangeName(!changeName)}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={22}
          color={palette.primary}
          onPress={() => setChangeName(!changeName)}
        />
      )}

      <Text style={[s.text]}>{props.label}</Text>
      {props.children}
    </View>
  );
}
