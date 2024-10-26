import { Text, TextProps } from 'react-native';

export default function Logo(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'CormorantGaramond-Italic', textAlign: "center", fontSize: 40, margin: 16 }, props.style]} >CafePlace</Text>
}
