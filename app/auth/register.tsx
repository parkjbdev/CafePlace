import FormNextButton from "@/components/atoms/form/FormNextButton";
import FormPrevButton from "@/components/atoms/form/FormPrevButton";
import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import ProgressBar from "@/components/atoms/form/ProgressBar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SlideTransition from "@/components/SlideTransition";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface Step {
  id: keyof FormData;
  title: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

const steps: Step[] = [
  {
    id: "name",
    title: "이름을 입력해주세요",
    placeholder: "이름",
  },
  {
    id: "email",
    title: "이메일을 입력해주세요",
    placeholder: "이메일",
    keyboardType: "email-address",
  },
  {
    id: "phone",
    title: "전화번호를 입력해주세요",
    placeholder: "전화번호",
    keyboardType: "number-pad",
  },
  {
    id: "password",
    title: "비밀번호를 입력해주세요",
    placeholder: "비밀번호",
  },
];

const StepForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleChange = (value: string): void => {
    const currentField = steps[currentStep].id;
    setFormData({
      ...formData,
      [currentField]: value,
    });
  };

  const handleNext = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (): void => {
    console.log("제출된 데이터:", formData);
    alert("폼이 성공적으로 제출되었습니다!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    setCurrentStep(0);
  };

  const currentValue = formData[steps[currentStep].id];

  const isCurrentStepValid = currentValue.trim() !== "";

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 32,
        backgroundColor: "#603F26",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <SafeAreaView></SafeAreaView>
      <SlideTransition>
        <ProgressBar currentStep={currentStep} stepLength={steps.length} />
      </SlideTransition>

      <SlideTransition>
        <FormTitle title={steps[currentStep].title} />
        <FormInput
          placeholder={steps[currentStep].placeholder}
          value={currentValue}
          onChangeText={handleChange}
          keyboardType={steps[currentStep].keyboardType}
          autoFocus
        />
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <FormPrevButton onPress={handlePrevious}>이전</FormPrevButton>
          )}
          <FormNextButton valid={isCurrentStepValid} handleNext={handleNext}>
            다음
          </FormNextButton>
        </View>
      </SlideTransition>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StepForm;
