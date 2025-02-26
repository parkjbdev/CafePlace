import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import SlideTransition from "@/components/SlideTransition";
import { TextInputProps } from "react-native";

interface FormPageInputFieldProps {
  title: string;
  description?: string;
  placeholder: string;
  secure?: boolean;
  currentValue: TextInputProps["value"];
  handleChange: NonNullable<TextInputProps["onChangeText"]>;
}

const FormPageInputField = ({
  title,
  description,
  placeholder,
  secure = false,
  currentValue,
  handleChange,
}: FormPageInputFieldProps) => {
  return (
    <>
      <SlideTransition>
        <FormTitle title={title} description={description} />
      </SlideTransition>
      <FormInput
        secure={secure}
        placeholder={placeholder}
        value={currentValue}
        onChangeText={handleChange}
        autoFocus
      />
    </>
  );
};

export default FormPageInputField;
