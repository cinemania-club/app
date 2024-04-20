import { StyleSheet } from "react-native";

export const palette = {
  primary: "#F2274C",
  text: "#FFFFFF",
  bgDark: "#000000",
  bgMedium: "#181818",
  bgLight: "#202020",
};

export default StyleSheet.create({
  bgDark: { backgroundColor: palette.bgDark },
  bgMedium: { backgroundColor: palette.bgMedium },
  bgLight: { backgroundColor: palette.bgLight },

  borderPrimary: { borderColor: palette.primary },
});
