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
import {
  NamePage,
  EmailPage,
  PhonePage,
  PasswordPage,
} from "@/components/molcules/register";
import EmailConfirmPage from "@/components/molcules/register/EmailConfirm";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import supabase from "@/api/supabase";
import { AuthError, EmailOtpType } from "@supabase/supabase-js";

interface FormData {
  name: string;
  email: string;
  password: string;
  emailConfirm: string;
  // phone: string;
}

// type StepId = "name" | "email" | "password" | "emailConfirm";
type StepId = keyof FormData;
const STEPS: StepId[] = ["name", "email", "password", "emailConfirm"];

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

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    emailConfirm: "",
    // phone: "",
    password: "",
  });

  const { Funnel, Step, currentStep, nextStep, prevStep, isLastStep, setStep } =
    useFunnel<StepId>(STEPS);

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNext = async () => {
    if (currentStep == "password") {
      const res = await handleSignUp();
      if (res.error) alert((res.error as AuthError).message);
    }

    if (!isLastStep()) {
      nextStep();
    } else {
      handleSubmit();
    }
  };

  const handleVerify = async () => {
    const { email, password, ...userData } = formData;
    const verificationRes = supabase.auth.verifyOtp({
      type: "signup",
      token: formData.emailConfirm,
      email,
    });
    return await verificationRes;
  };

  const handleSignUp = async () => {
    const { name, email, password } = formData;

    const res = signUp({
      name,
      email,
      password,
    });

    return await res;
  };

  const handleSubmit = async () => {
    handleVerify();
    // const { email, password, ...userData } = formData;
    //
    // const res = signUp({
    //   email,
    //   password,
    //   userData,
    // });

    // console.log(await verificationRes);
    // console.log(await res);

    setFormData({
      name: "",
      email: "",
      emailConfirm: "",
      // phone: "",
      password: "",
    });

    router.replace("/");
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
                  currentValue={formData.name}
                  handleChange={handleChange("name")}
                />
              </Step>
              <Step name="email">
                <EmailPage
                  currentValue={formData.email}
                  handleChange={handleChange("email")}
                />
              </Step>
              <Step name="password">
                <PasswordPage
                  currentValue={formData.password}
                  handleChange={handleChange("password")}
                />
              </Step>
              <Step name="emailConfirm">
                <EmailConfirmPage
                  currentValue={formData.emailConfirm}
                  handleChange={handleChange("emailConfirm")}
                />
              </Step>
              {/* <Step name="phone"> */}
              {/*   <PhonePage */}
              {/*     currentValue={formData.phone} */}
              {/*     handleChange={handleChange("phone")} */}
              {/*   /> */}
              {/* </Step> */}
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
