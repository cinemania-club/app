import React from "react";
import { Pressable, Text, View } from "react-native";
import s from "../src/theme/styles";
import Overlay from "./Overlay";

export default function (props: { onClose: () => void }) {
  return (
    <Overlay>
      <View style={[s.jcCenter, s.flex1, s.p4]}>
        <View style={[s.bgLight, s.r4, s.g4, s.p4, { maxWidth: 400 }]}>
          <Text style={[s.text]}>
            Itens <Text style={[s.textPrimary]}>Arquivados</Text> são retirados
            das listas de recomendações para você e filtragens.
          </Text>

          <Pressable onPress={() => props.onClose()}>
            <Text style={[s.textStrong, s.taCenter]}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Overlay>
  );
}
