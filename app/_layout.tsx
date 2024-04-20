import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import AuthProvider from "../components/AuthProvider";
import s from "../src/theme/styles";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DarkTheme}>
      <AuthProvider>
        <Drawer
          screenOptions={{ headerShown: false }}
          drawerContent={() => <DrawerContent />}
        >
          <Drawer.Screen name="index" options={{ drawerLabel: "Lista" }} />
          <Drawer.Screen name="amigos" options={{ drawerLabel: "Amigos" }} />
        </Drawer>
      </AuthProvider>
    </ThemeProvider>
  );
}

function DrawerContent() {
  return (
    <View style={[s.flex1, s.bgMedium]}>
      <View style={[{ height: 200 }, s.bgPrimary, s.aiCenter, s.jcCenter]}>
        <Text style={[s.textBold, { fontSize: 32 }]}>LOGO</Text>
      </View>

      <View style={[s.p5, s.g5]}>
        <Link href="/" style={[s.pressable]}>
          <Text style={[s.textBold]}>Lista</Text>
        </Link>

        <Link href="/amigos" style={[s.pressable]}>
          <Text style={[s.textBold]}>Amigos</Text>
        </Link>
      </View>
    </View>
  );
}
