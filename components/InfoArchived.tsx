import React from "react";
import { Pressable, Text } from "react-native";
import s from "../src/theme/styles";
import DefaultModal from "./DefaultModal";

export default function (props: { onClose: () => void }) {
  return (
    <DefaultModal>
      <Text style={[s.text]}>
        Itens <Text style={[s.textPrimary]}>Arquivados</Text> são retirados das
        listas de recomendações para você e filtragens.
      </Text>

      <Pressable onPress={() => props.onClose()}>
        <Text style={[s.textStrong, s.taCenter]}>OK</Text>
      </Pressable>
    </DefaultModal>
  );
}
