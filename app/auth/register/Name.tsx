import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import { FormPageProps } from "./types";
import SlideTransition from "@/components/SlideTransition";

const NamePage = ({ currentValue, handleChange }: FormPageProps) => {
  return (
    <>
      <SlideTransition>
        <FormTitle title="이름을 알려주세요" />
      </SlideTransition>
      <FormInput
        placeholder="이름"
        value={currentValue}
        onChangeText={handleChange}
        autoFocus
      />
    </>
  );
};

export default NamePage;
