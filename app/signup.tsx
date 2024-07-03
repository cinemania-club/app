import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { ReactNode, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ActionButton from "../components/ActionButton";
import DrawerFrame from "../components/DrawerFrame";
import TextField from "../components/TextField";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function () {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

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
        />
        <Field
          title="Telefone (opcional)"
          placeholder="Digite seu telefone com DDD"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Field
          title="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Field
          title="Nome de usuário"
          placeholder="Escolha um nome de usuário"
          value={username}
          onChangeText={(text) => setUsername(text)}
          reverse
        >
          <Text style={s.textPrimary}>@</Text>
        </Field>
        <Field
          title="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
        >
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
        <Field
          title="Confirmar senha"
          placeholder="Digite sua senha novamente"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
        >
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
        <Text style={s.textPrimary}>{error}</Text>
        <ActionButton
          icon={<MaterialIcons name="login" />}
          title="Cadastrar"
          onPress={async () => {
            try {
              await server.post("/user/sign-up", {
                username,
                email,
                password,
                name,
                phone,
              });

              router.push("/");
            } catch (error: any) {
              setError(error.response.data.message[0]);
            }
          }}
        />
      </ScrollView>
    </DrawerFrame>
  );
}

function Field(props: {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <View style={[s.g2]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(text) => props.onChangeText(text)}
        reverse={props.reverse}
      >
        {props.children}
      </TextField>
    </View>
  );
}
