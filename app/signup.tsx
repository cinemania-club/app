import { MaterialIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import DrawerFrame from "../components/DrawerFrame";
import TextField from "../components/TextField";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function () {
  return (
    <DrawerFrame title="Cadastro">
      <Text style={s.text}>LOGO</Text>
      <View style={s.g4}>
        <Field title="Email" placeholder="Digite seu email" />
        <Field
          title="Telefone (opcional)"
          placeholder="Digite seu telefone com DDD"
        />
        <Field title="Nome" placeholder="Digite seu nome" />
        <Field title="Senha" placeholder="Digite sua senha">
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
      </View>
    </DrawerFrame>
  );
}

function Field(props: {
  title: string;
  placeholder: string;
  children?: ReactNode;
}) {
  return (
    <View style={[s.g2, s.px5]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField placeholder={props.placeholder}>{props.children}</TextField>
    </View>
  );
}
