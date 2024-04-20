import { StyleSheet } from "react-native";

import colors, { palette } from "./colors";
import spaces from "./spaces";

const props = StyleSheet.create({
  rounded: { borderRadius: 99999 },

  taCenter: { textAlign: "center" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },

  aiCenter: { alignItems: "center" },

  jcCenter: { justifyContent: "center" },
  jcBetween: { justifyContent: "space-between" },

  flex1: { flex: 1 },
});

const components = StyleSheet.create({
  text: { color: palette.text, fontSize: 12, lineHeight: 18 },
  textBold: {
    color: palette.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "bold",
  },
  textStrong: {
    color: palette.primary,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "bold",
  },

  pressable: { padding: 8, margin: -8 },
});

const s = { ...colors, ...spaces, ...props, ...components };
export default s;
