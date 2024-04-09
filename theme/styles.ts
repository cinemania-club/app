import { StyleSheet } from "react-native";

import colors, { palette } from "./colors";
import spaces from "./spaces";

const props = StyleSheet.create({
  rounded: { borderRadius: 99999 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },

  aiCenter: { justifyContent: "center" },
  jcCenter: { justifyContent: "center" },
});

const components = StyleSheet.create({
  text: { color: palette.text, fontSize: 12, lineHeight: 18 },
  textStrong: { color: palette.primary, fontWeight: "bold" },
});

const s = { ...colors, ...spaces, ...props, ...components };
export default s;
