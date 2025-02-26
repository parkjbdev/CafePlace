import Logo from "@/components/atoms/logo/Logo";
import { View } from "react-native";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#603F26",
      }}
    >
      <Logo style={{ color: "#FFDBB5" }} />
    </View>
  );
};
