import {
  SafeAreaView,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Logo from "./Logo";

export const HeaderLogo = (props: {
  viewStyle?: StyleProp<ViewStyle>;
  logoStyle?: StyleProp<TextStyle>;
}) => (
  <View style={[props.viewStyle, { width: "100%" }]}>
    <SafeAreaView />
    <Logo style={[{ fontSize: 30 }, props.logoStyle]} />
  </View>
);

// export const HeaderLogo = (props: {
//   viewStyle?: StyleProp<ViewStyle>;
//   logoStyle?: StyleProp<TextStyle>;
// }) => (
//   <View
//     style={[{ backgroundColor: "#603F26", width: "100%" }, props.viewStyle]}
//   >
//     <SafeAreaView />
//     <Logo style={[{ fontSize: 30, color: "#FFDBB5" }, props.logoStyle]} />
//   </View>
// );

export default HeaderLogo;
