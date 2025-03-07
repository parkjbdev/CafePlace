import FormPageInputField, {
  FormPageInputFieldProps,
} from "@/components/molcules/form/FormPageInputField";

const PhonePage: React.FC<FormPageInputFieldProps> = (props) => {
  return (
    <FormPageInputField
      title="전화번호를 입력해주세요"
      description="010-1234-5678 과 같이 휴대전화를 입력해주세요"
      placeholder="전화번호"
      {...props}
    />
  );
};

export default PhonePage;
