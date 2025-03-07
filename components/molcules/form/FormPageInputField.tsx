import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import SlideTransition from "@/components/SlideTransition";
import { TextInputProps } from "react-native";

// optional title prop
export type FormPageInputFieldProps = Omit<
  StrictFormPageInputFieldProps,
  "title"
> &
  Partial<Pick<StrictFormPageInputFieldProps, "title">> & TextInputProps;

export interface StrictFormPageInputFieldProps {
  title: string;
  description?: string;
  placeholder?: string;
  secure?: boolean;
  currentValue: TextInputProps["value"];
  handleChange: NonNullable<TextInputProps["onChangeText"]>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const FormPageInputField = ({
  title,
  description,
  placeholder,
  secure = false,
  currentValue,
  handleChange,
  autoCapitalize = "none",
  ...formprops
}: StrictFormPageInputFieldProps & TextInputProps) => {
  return (
    <>
      <SlideTransition>
        <FormTitle title={title} description={description} />
      </SlideTransition>
      <FormInput
        autoCapitalize={autoCapitalize}
        secure={secure}
        placeholder={placeholder}
        value={currentValue}
        onChangeText={handleChange}
        autoFocus
        {...formprops}
      />
    </>
  );
};

export default FormPageInputField;
