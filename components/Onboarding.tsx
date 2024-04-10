import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

import { palette } from "../theme/colors";
import s from "../theme/styles";

export default function Onboarding(props: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    getUserId();
  }, []);

  if (!userId) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return props.children;

  async function getUserId() {
    const userId: string = (await AsyncStorage.getItem("userId")) || uuidv4();
    await AsyncStorage.setItem("userId", userId);
    setUserId(userId);
  }
}
