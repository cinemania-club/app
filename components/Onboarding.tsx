import { ReactNode, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { palette } from "../theme/colors";
import s from "../theme/styles";

export default function Onboarding(props: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return props.children;
}
