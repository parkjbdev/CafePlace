import React from "react";
import FormPageInputField from "@/components/molcules/form/FormPageInputField";
import { FormPageProps } from "../form/types";

const PasswordPage: React.FC<FormPageProps> = (props) => {
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
