import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { ReactNode, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ActionButton from "../components/ActionButton";
import DrawerFrame from "../components/DrawerFrame";
import TextField from "../components/TextField";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type SignupErrors = {
  email?: string;
  phone?: string;
  name?: string;
  username?: string;
  password?: string;
};

const UNMATCHED_PASSWORD_ERROR = "As senhas não combinam";

export default function () {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [matchingPassword, setMatchingPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirmation, setHidePasswordConfirmation] =
    useState(true);

  const server = useServer();

  return (
    <DrawerFrame title="Cadastro" noSearch>
      <ScrollView
        style={[s.flex1]}
        contentContainerStyle={[s.g4, s.p5, s.jcEnd, { minHeight: "100%" }]}
      >
        <Field
          title="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={errors.email}
        />
        <Field
          title="Telefone (opcional)"
          placeholder="Digite seu telefone com DDD"
          value={phoneMask(phone)}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
          error={errors.phone}
        />
        <Field
          title="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
          error={errors.name}
        />
        <Field
          title="Nome de usuário"
          placeholder="Escolha um nome de usuário"
          value={username}
          onChangeText={(text) => setUsername(text)}
          reverse
          error={errors.username}
        >
          <Text style={s.textPrimary}>@</Text>
        </Field>
        <Field
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
        </Field>
        <Field
          title="Confirmar senha"
          placeholder="Digite sua senha novamente"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          hideText={hidePasswordConfirmation}
          error={!matchingPassword ? UNMATCHED_PASSWORD_ERROR : undefined}
        >
          <Pressable
            onPress={() =>
              setHidePasswordConfirmation(!hidePasswordConfirmation)
            }
          >
            <MaterialIcons
              name="remove-red-eye"
              color={palette.primary}
              size={20}
            />
          </Pressable>
        </Field>
        <ActionButton
          icon={<MaterialIcons name="login" />}
          title="Cadastrar"
          disabled={
            !username || !email || !password || !passwordConfirmation || !name
          }
          onPress={() => signup()}
        />
      </ScrollView>
    </DrawerFrame>
  );

  function phoneMask(digits: string) {
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7)
      return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;

    return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
  }

  async function signup() {
    setErrors({});

    const matching = password === passwordConfirmation;
    setMatchingPassword(matching);
    if (!matching) return;

    try {
      await server.post("/user/sign-up", {
        username,
        email,
        password,
        name,
        phone: phone || undefined,
      });

      router.push("/");
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }
}

function Field(props: {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hideText?: boolean;
  reverse?: boolean;
  children?: ReactNode;
  error?: string;
}) {
  return (
    <View style={[s.g2]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(text) => props.onChangeText(text)}
        hideText={props.hideText}
        reverse={props.reverse}
      >
        {props.children}
      </TextField>
      {props.error && <Text style={s.textPrimary}>{props.error}</Text>}
    </View>
  );
}
