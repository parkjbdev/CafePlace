import { TextProps, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import StyledText from "@/components/atoms/text/StyledText";

export default function Logo(props: TextProps) {
    const theme = useColorScheme() ?? "light";
    return (
        <StyledText
            {...props}
            style={[
                { fontSize: 40, margin: 8, color: Colors[theme ?? "light"].tint },
                props.style,
            ]}
        >
            CafePlace
        </StyledText>
    );
}
