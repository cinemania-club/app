import { ScrollView, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import ActionButton from "../components/ActionButton";
import DrawerFrame from "../components/DrawerFrame";
import TextField from "../components/TextField";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export default function () {
  return (
    <DrawerFrame title="Login">
      <ScrollView
        style={[s.flex1]}
        contentContainerStyle={[s.g4, s.p5, s.jcEnd, { minHeight: "100%" }]}
      >
        <Text
          style={[
            s.textBold,
            s.taCenter,
            s.absolute,
            { fontSize: 30, top: "20%" },
          ]}
        >
          LOGO
        </Text>
        <Field title="Login" placeholder="Digite o seu e-mail" />
        <Field title="Senha" placeholder="Digite sua senha">
          <MaterialIcons
            name="remove-red-eye"
            color={palette.primary}
            size={20}
          />
        </Field>
        <ActionButton
          icon={<MaterialIcons name="login" />}
          title="Cadastrar"
          onPress={() => {}}
        />
        <Text style={[s.textStrong]}>Esqueci a senha</Text>
      </ScrollView>
    </DrawerFrame>
  );
}

function Field(props: {
  title: string;
  placeholder: string;
  children?: ReactNode;
}) {
  return (
    <View style={[s.g2]}>
      <Text style={s.textStrong}>{props.title}</Text>
      <TextField placeholder={props.placeholder}>{props.children}</TextField>
    </View>
  );
}
