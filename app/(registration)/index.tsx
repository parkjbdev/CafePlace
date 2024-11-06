import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import Logo from "@/components/Logo";
import { Button, SafeAreaView, Text, View } from "react-native";
import { router } from "expo-router";

export default function Page() {

  const translateY = useSharedValue<number>(0);
  const handlePress = () => {
    translateY.value -= 50;
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(translateY.value * 2, { duration: 400, easing: Easing.out(Easing.quad), }) }],
  }));

  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#603F26" }}>
    <SafeAreaView />
    <Logo style={[{ color: "#FFDBB5" }, animatedStyles]} />
    <Text style={{ color: "white" }}>카페 큐레이팅</Text>
    <Button onPress={handlePress} title="Click me" />
    <Button onPress={() => router.push('/(home)')} title="route"/>
  </View >
}
