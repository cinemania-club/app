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
  const [auth, setAuth] = useState<string>("");

  const server = useServer();

  useEffect(() => {
    initAuth();
  }, []);

  if (!auth) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ auth, saveToken }}>
      {props.children}
    </AuthContext.Provider>
  );

  async function initAuth() {
    const auth = await getAuth();
    setAuth(auth);
  }

  async function getAuth() {
    const auth = await AsyncStorage.getItem("auth");
    if (auth) return auth;

    return createAnonymousUser();
  }

  async function createAnonymousUser() {
    const uuid = uuidv4();

    await server.post(`/user`, { uuid });

    await AsyncStorage.setItem("auth", uuid);
    return uuid;
  }

  async function saveToken(token: string) {
    const bearerToken = `Bearer ${token}`;

    await AsyncStorage.setItem("auth", bearerToken);
    setAuth(bearerToken);
  }
}
