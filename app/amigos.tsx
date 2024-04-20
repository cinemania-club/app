import { Text } from "react-native";

import DrawerFrame from "../components/DrawerFrame";
import s from "../src/theme/styles";

export default function Amigos() {
  return (
    <DrawerFrame title="Amigos">
      <Text style={s.text}>Amigos</Text>
    </DrawerFrame>
  );
}
