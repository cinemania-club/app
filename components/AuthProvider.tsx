import "react-native-get-random-values";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../src/contexts";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function (props: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");

  const server = useServer();

  useEffect(() => {
    initToken();
  }, []);

  if (!token) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={token}>{props.children}</AuthContext.Provider>
  );

  async function initToken() {
    const token = await getToken();
    setToken(token);
  }

  async function getToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) return token;

    return createAnonymousUser();
  }

  async function createAnonymousUser() {
    const token = uuidv4();

    await server.post(`/user`, { uuid: token });

    await AsyncStorage.setItem("token", token);
    return token;
  }
}
