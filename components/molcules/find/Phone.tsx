import FormPageInputField from "@/components/molcules/form/FormPageInputField";
import { FormPageProps } from "../form/types";

const PhonePage: React.FC<FormPageProps> = (props) => {
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
