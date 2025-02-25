import React from "react";
import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import { FormPageProps } from "./types";
import SlideTransition from "@/components/SlideTransition";

const EmailPage: React.FC<FormPageProps> = ({ currentValue, handleChange }) => {
  return (
    <>
      <SlideTransition>
        <FormTitle title="이메일을 입력해주세요" />
      </SlideTransition>
      <FormInput
        placeholder="이메일"
        value={currentValue}
        onChangeText={handleChange}
        keyboardType="email-address"
        autoFocus
      />
    </>
  );
};

export const validate = (value: string) => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export default EmailPage;
