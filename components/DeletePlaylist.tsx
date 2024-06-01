import { Pressable, Text, View } from "react-native";
import s from "../src/theme/styles";
import Modal from "./Modal";

export default function (props: {
  onClose: () => void;
  onDelete: () => void;
  name: string;
}) {
  return (
    <Modal>
      <View style={[s.p3]}>
        <Text style={[s.textSemiBold]}>
          Você tem certeza que deseja excluir a playlist "{props.name}"
        </Text>

        <View style={[s.row, s.jcBetween, s.mt4]}>
          <Pressable onPress={() => props.onClose()}>
            <Text style={[s.textStrong]}>CANCELAR</Text>
          </Pressable>
          <Pressable onPress={() => props.onDelete()}>
            <Text style={[s.textStrong]}>EXCLUIR</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
