import React from "react";
import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import { FormPageProps } from "./types";
import SlideTransition from "@/components/SlideTransition";

const PhonePage: React.FC<FormPageProps> = ({ currentValue, handleChange }) => {
  return (
    <>
      <SlideTransition>
        <FormTitle title="전화번호를 입력해주세요" />
      </SlideTransition>
      <FormInput
        placeholder="전화번호"
        value={currentValue}
        onChangeText={handleChange}
        keyboardType="phone-pad"
        autoFocus
      />
    </>
  );
};

export default PhonePage;
