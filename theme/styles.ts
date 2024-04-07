import { StyleSheet } from "react-native";

import colors from "./colors";

const props = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },
});

const ss = {
  ...props,

  jc: StyleSheet.create({
    center: { justifyContent: "center" },
  }),

  ai: StyleSheet.create({
    center: { alignItems: "center" },
  }),

  text: StyleSheet.create({
    _: { color: colors.text, fontSize: 12, lineHeight: 18 },
    strong: { color: colors.primary, fontWeight: "bold" },
  }),
};

export default ss;
