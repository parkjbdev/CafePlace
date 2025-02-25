import FormPageInputField from "@/components/organisms/form/FormPageInputField";
import { FormPageProps } from "./types";

const EmailPage: React.FC<FormPageProps> = (props) => {
  return (
    <FormPageInputField
      title="이메일을 입력해주세요"
      description="이메일은 로그인에 사용됩니다"
      placeholder="이메일"
      {...props}
    />
  );
};

export const validate = (value: string) => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export default EmailPage;
