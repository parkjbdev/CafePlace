import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register/index" />
      <Stack.Screen name="find/index" />
    </Stack>
  );
}
