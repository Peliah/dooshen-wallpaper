import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Thin': require('../assets/fonts/poppins/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../assets/fonts/poppins/Poppins-ThinItalic.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/poppins/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../assets/fonts/poppins/Poppins-LightItalic.ttf'),
    'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../assets/fonts/poppins/Poppins-Italic.ttf'),
    'Poppins-Medium': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../assets/fonts/poppins/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../assets/fonts/poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-Black': require('../assets/fonts/poppins/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../assets/fonts/poppins/Poppins-BlackItalic.ttf'),
    'ClashDisplay-Medium': require('../assets/fonts/clash-display/ClashDisplay-Medium.otf'),
    'ClashDisplay-Regular': require('../assets/fonts/clash-display/ClashDisplay-Regular.otf'),
    'ClashDisplay-Light': require('../assets/fonts/clash-display/ClashDisplay-Light.otf'),
    'ClashDisplay-Bold': require('../assets/fonts/clash-display/ClashDisplay-Bold.otf'),
    'ClashDisplay-SemiBold': require('../assets/fonts/clash-display/ClashDisplay-Semibold.otf'),
    'ClashDisplay-ExtraLight': require('../assets/fonts/clash-display/ClashDisplay-Extralight.otf'),

  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
