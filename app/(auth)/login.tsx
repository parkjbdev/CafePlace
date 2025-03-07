import FormNextButton from "@/components/atoms/form/FormNextButton";
import FormPrevButton from "@/components/atoms/form/FormPrevButton";
import ProgressBar from "@/components/atoms/form/ProgressBar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SlideTransition from "@/components/SlideTransition";
import { useFunnel } from "@/hooks/useFunnel";
import { EmailPage, PasswordPage } from "@/components/molcules/authformpage";
import supabase from "@/api/supabase";
import { router } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { SignInForm } from "@/types/SignInForm";

type StepId = "email" | "password";
const STEPS: StepId[] = ["email", "password"];

const StepForm: React.FC = () => {
  const {
    user,
    session,
    authState,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  } = useAuth();

  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const { Funnel, Step, currentStep, nextStep, prevStep, isLastStep, setStep } =
    useFunnel<StepId>(STEPS);

  const handleChange = (field: keyof SignInForm) => (value: string) => {
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

  const handleSubmit = async () => {
    const { data, error } = await signIn(formData);
    if (!!data) {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (!session) return;
    router.replace("/curation");
  }, [session]);

  const isCurrentStepValid = (): boolean => {
    const currentValue = formData[currentStep as keyof SignInForm];
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
              <Step name="email">
                <EmailPage
                  onSubmitEditing={handleNext}
                  description="회원가입시 입력한 이메일 주소를 입력해주세요."
                  currentValue={formData.email}
                  handleChange={handleChange("email")}
                />
              </Step>
              <Step name="password">
                <PasswordPage
                  onSubmitEditing={handleNext}
                  description=""
                  currentValue={formData.password}
                  handleChange={handleChange("password")}
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
