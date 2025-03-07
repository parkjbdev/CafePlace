import FormNextButton from "@/components/atoms/form/FormNextButton";
import FormPrevButton from "@/components/atoms/form/FormPrevButton";
import ProgressBar from "@/components/atoms/form/ProgressBar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SlideTransition from "@/components/SlideTransition";
import { useFunnel } from "@/hooks/useFunnel";
import { EmailPage, NamePage, PhonePage } from "@/components/molcules/authformpage";

interface FormData {
  name: string;
  email: string;
  phone: string;
  // password: string;
}

type StepId = "name" | "email" | "phone";
const STEPS: StepId[] = ["name", "email", "phone"];

const StepForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });

  const { Funnel, Step, currentStep, nextStep, prevStep, isLastStep, setStep } =
    useFunnel<StepId>(STEPS);

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNext = (): void => {
    if (!isLastStep()) {
      nextStep();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = (): void => {
    console.log("제출된 데이터:", formData);
    alert("폼이 성공적으로 제출되었습니다!");

    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    setStep("name");
  };

  const isCurrentStepValid = (): boolean => {
    const currentValue = formData[currentStep as keyof FormData];
    return currentValue.trim() !== "";
  };

  const currentStepIndex = STEPS.indexOf(currentStep as StepId);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#603F26",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <SafeAreaView />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 32,
        }}
      >
        <SlideTransition style={{ flex: 1 }}>
          <ProgressBar
            currentStep={currentStepIndex}
            stepLength={STEPS.length}
          />
          <View style={{ flex: 1 }}>
            <Funnel step={currentStep}>
              <Step name="name">
                <NamePage
                  onSubmitEditing={handleNext}
                  currentValue={formData.name}
                  handleChange={handleChange("name")}
                />
              </Step>
              <Step name="email">
                <EmailPage
                  onSubmitEditing={handleNext}
                  currentValue={formData.email}
                  handleChange={handleChange("email")}
                />
              </Step>
              <Step name="phone">
                <PhonePage
                  onSubmitEditing={handleNext}
                  currentValue={formData.phone}
                  handleChange={handleChange("phone")}
                />
              </Step>
            </Funnel>
          </View>
          <View style={styles.buttonContainer}>
            {currentStepIndex > 0 && (
              <FormPrevButton onPress={prevStep}>이전</FormPrevButton>
            )}
            <FormNextButton
              valid={isCurrentStepValid()}
              handleNext={handleNext}
            >
              {isLastStep() ? "제출" : "다음"}
            </FormNextButton>
          </View>
        </SlideTransition>
      </View>
      <SafeAreaView />
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
