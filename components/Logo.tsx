import { Text, TextProps } from 'react-native';
import Animated from 'react-native-reanimated';

export default function Logo(props: TextProps) {
  return <Animated.Text {...props} style={[{ fontFamily: 'CormorantGaramond-Italic', textAlign: "center", fontSize: 40, margin: 8 }, props.style]} >CafePlace</Animated.Text>
}

export function StyledText(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'CormorantGaramond-Italic', textAlign: "center" }, props.style]} >{props.children}</Text>
}
