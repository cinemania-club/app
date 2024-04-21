import { Text } from "react-native";

import DrawerFrame from "../../components/DrawerFrame";
import s from "../../src/theme/styles";

export default function () {
  return (
    <DrawerFrame title="Busca" back noSearch>
      <Text style={s.text}>Buscando</Text>
    </DrawerFrame>
  );
}
