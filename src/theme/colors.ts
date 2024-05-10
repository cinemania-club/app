import { StyleSheet } from "react-native";

export const palette = {
  primary: "#F2274C",
  accent: "#F2274C",
  text: "#FFFFFF",
  bgPrimary: "#801528",
  bgDark: "#000000",
  bgMedium: "#181818",
  bgLight: "#202020",
  overlay: "rgba(0,0,0,0.8)",
};

export default StyleSheet.create({
  bgPrimary: { backgroundColor: palette.bgPrimary },
  bgAccent: { backgroundColor: palette.accent },
  bgDark: { backgroundColor: palette.bgDark },
  bgMedium: { backgroundColor: palette.bgMedium },
  bgLight: { backgroundColor: palette.bgLight },
  bgOverlay: { backgroundColor: palette.overlay },

  borderPrimary: { borderColor: palette.primary },
});
