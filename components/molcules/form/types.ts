import { TextInputProps } from "react-native";

export interface FormPageProps {
  currentValue: TextInputProps["value"];
  handleChange: NonNullable<TextInputProps["onChangeText"]>;
}
