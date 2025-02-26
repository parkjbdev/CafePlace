import { Text, TextProps } from "react-native";

const StyledText: React.FC<TextProps> = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "CormorantGaramond-Italic", textAlign: "center" },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default StyledText;
