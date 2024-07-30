import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";

export default function (props: {
  label: string;
  onChange: (checked: boolean) => void;
  initial?: boolean;
  radio?: boolean;
}) {
  const [checked, setChecked] = useState(props.initial || false);

  useEffect(() => {
    props.onChange(checked);
  }, [checked]);

  const icon = props.radio
    ? checked
      ? "radiobox-marked"
      : "radiobox-blank"
    : checked
      ? "checkbox-marked"
      : "checkbox-blank-outline";

  return (
    <Pressable
      style={[s.row, s.aiCenter, s.g2]}
      onPress={() => setChecked(!checked)}
    >
      <MaterialCommunityIcons name={icon} color={palette.primary} size={20} />
      <Text style={[s.text]}>{props.label}</Text>
    </Pressable>
  );
}
