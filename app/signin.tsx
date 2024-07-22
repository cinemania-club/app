import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import DrawerFrame from "../components/DrawerFrame";
import ActionButton from "../components/form/ActionButton";
import TextGroup from "../components/form/TextGroup";
import { AuthContext } from "../src/contexts";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type SignupErrors = {
  email?: string;
  password?: string;
  message?: string;
};

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [hidePassword, setHidePassword] = useState(true);

  const server = useServer();
  const { saveToken } = useContext(AuthContext)!;

  return (
    <DrawerFrame title="Login" noSearch>
      <ScrollView
        style={[s.flex1]}
        contentContainerStyle={[s.g4, s.p5, s.jcEnd, { minHeight: "100%" }]}
      >
        <TextGroup
          title="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={errors.email}
        />
        <TextGroup
          title="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          hideText={hidePassword}
          error={errors.password}
        >
          <Pressable onPress={() => setHidePassword(!hidePassword)}>
            <MaterialIcons
              name="remove-red-eye"
              color={palette.primary}
              size={20}
            />
          </Pressable>
        </TextGroup>

        <ActionButton
          icon={<MaterialIcons name="login" />}
          title="Logar"
          disabled={!email || !password}
          onPress={() => signin()}
        />
        <Text style={s.textStrong}>Esqueci a senha</Text>
      </ScrollView>
    </DrawerFrame>
  );

  async function signin() {
    setErrors({});

    try {
      const response = await server.post<{ token: string }>("/user/sign-in", {
        email,
        password,
      });
      saveToken(response.data.token);

      router.push("/");
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }
}
