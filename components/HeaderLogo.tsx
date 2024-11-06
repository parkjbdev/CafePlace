import { SafeAreaView, StyleProp, TextStyle, ViewStyle } from "react-native";
import Logo from "./Logo";

export const HeaderLogo = (props: { viewStyle?: StyleProp<ViewStyle>, logoStyle?: StyleProp<TextStyle> }) =>
  <SafeAreaView style={[props.viewStyle]}>
    <Logo style={[{ fontSize: 30 }, props.logoStyle]} />
  </SafeAreaView>

// export const HeaderLogo = (props: { viewStyle?: StyleProp<ViewStyle>, logoStyle?: StyleProp<TextStyle> }) =>
//   <SafeAreaView style={[{ backgroundColor: '#603F26' }, props.viewStyle]}>
//     <Logo style={[{ fontSize: 30, color: "#FFDBB5" }, props.logoStyle]} />
//   </SafeAreaView>


// header: () => {
//   return <SafeAreaView><Logo style={{ fontSize: 24 }} /></SafeAreaView>
// },

export default HeaderLogo;
