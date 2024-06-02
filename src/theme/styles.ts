import { StyleSheet } from "react-native";

import colors, { palette } from "./colors";
import spaces from "./spaces";

const props = StyleSheet.create({
  rounded: { borderRadius: 99999 },

  taCenter: { textAlign: "center" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },
  rowReverse: { flexDirection: "row-reverse" },

  aiCenter: { alignItems: "center" },
  aiEnd: { alignItems: "flex-end" },

  jcCenter: { justifyContent: "center" },
  jcBetween: { justifyContent: "space-between" },
  jcEnd: { justifyContent: "flex-end" },

  flex1: { flex: 1 },
  wrap: { flexWrap: "wrap" },

  absolute: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 },

  italic: { fontStyle: "italic" },
});

const components = StyleSheet.create({
  text: { color: palette.text, fontSize: 12, lineHeight: 18 },
  textPrimary: { color: palette.primary, fontSize: 12, lineHeight: 18 },
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

  overlay: {
    backgroundColor: palette.overlay,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const s = { ...colors, ...spaces, ...props, ...components };
export default s;
