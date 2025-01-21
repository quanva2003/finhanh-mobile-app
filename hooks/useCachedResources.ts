import { useFonts } from "expo-font"

export function useCachedResources() {
  const [fontsLoaded] = useFonts({
    "Quick-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quick-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quick-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  })

  return fontsLoaded
}
