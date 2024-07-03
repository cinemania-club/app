import { MaterialIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import ActionButton from "../components/ActionButton";
import DrawerFrame from "../components/DrawerFrame";
import TextField from "../components/TextField";
import { useServer } from "../src/hooks";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function () {
  const server = useServer();

  return (
    <DrawerFrame title="Cadastro" noSearch>
      <ScrollView
        style={[s.flex1]}
        contentContainerStyle={[s.g4, s.p5, s.jcEnd, { minHeight: "100%" }]}
      >
        <Field title="Email" placeholder="Digite seu email" />
        <Field
          title="Telefone (opcional)"
          placeholder="Digite seu telefone com DDD"
        />
        <Field title="Nome" placeholder="Digite seu nome" />
        <Field
          title="Nome de usuário"
          placeholder="Escolha um nome de usuário"
          reverse
        >
          <Text style={s.textPrimary}>@</Text>
        </Field>
        <Field title="Senha" placeholder="Digite sua senha">
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
        <Field title="Confirmar senha" placeholder="Digite sua senha novamente">
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
        <ActionButton
          icon={<MaterialIcons name="login" />}
          title="Cadastrar"
          onPress={async () => {
            await server.post("/user/sign-up", {
              username: "joaozinho",
              email: "joao@cinemania.club",
              password: "S54kh01!",
              name: "João",
              phone: "21987654321",
            });
          }}
        />
      </ScrollView>
    </DrawerFrame>
  );
}

function Field(props: {
  title: string;
  placeholder: string;
  children?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <View style={[s.g2]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField placeholder={props.placeholder} reverse={props.reverse}>
        {props.children}
      </TextField>
    </View>
  );
}
