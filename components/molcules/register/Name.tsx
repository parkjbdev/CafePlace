import FormPageInputField from "@/components/molcules/form/FormPageInputField";
import { FormPageProps } from "../form/types";

const NamePage: React.FC<FormPageProps> = (props) => {
  return (
    <FormPageInputField
      title="이름을 알려주세요"
      description="CafePlace의 닉네임으로 사용됩니다"
      placeholder="이름"
      {...props}
    />
  );
};

export default NamePage;
