import React from "react";
import { FormPageProps } from "./types";
import { StyleSheet } from "react-native";
import FormPageInputField from "@/components/organisms/form/FormPageInputField";

const PasswordPage = ({ ...props }: FormPageProps) => {
  return (
    <>
      <FormPageInputField
        secure
        title="비밀번호를 입력해주세요"
        description="8자 이상, 영문, 숫자, 특수기호를 포함해주세요"
        placeholder="비밀번호"
        {...props}
      />
    </>
  );
};


export default PasswordPage;
