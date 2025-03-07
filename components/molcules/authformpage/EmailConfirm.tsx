import FormPageInputField, {
  FormPageInputFieldProps,
} from "@/components/molcules/form/FormPageInputField";

const EmailConfirmPage: React.FC<FormPageInputFieldProps> = (props) => {
  return (
    <FormPageInputField
      title="이메일로 인증번호를 발송하였습니다"
      description="이메일로 수신받은 인증번호를 입력해주세요"
      placeholder="XXXXXX"
      {...props}
    />
  );
};

export default EmailConfirmPage;
