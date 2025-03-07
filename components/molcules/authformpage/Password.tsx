import FormPageInputField, {
  FormPageInputFieldProps,
} from "@/components/molcules/form/FormPageInputField";

const PasswordPage: React.FC<FormPageInputFieldProps> = (props) => {
  return (
    <>
      <FormPageInputField
        secure={true}
        title="비밀번호를 입력해주세요"
        description="8자 이상, 영문, 숫자, 특수기호를 포함해주세요"
        placeholder="비밀번호"
        {...props}
      />
    </>
  );
};

export default PasswordPage;
