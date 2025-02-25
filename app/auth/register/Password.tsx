import React, { useState, useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import FormTitle from "@/components/atoms/form/FormTitle";
import FormInput from "@/components/atoms/form/FormInput";
import { FormPageProps } from "./types";
import SlideTransition from "@/components/SlideTransition";

const PasswordPage: React.FC<FormPageProps> = ({
  currentValue,
  handleChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const secureAnim = useRef(new Animated.Value(1)).current;

  const visibilityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePasswordChange = (text: string) => {
    handleChange(text);

    if (!isPasswordVisible) {
      setIsPasswordVisible(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(secureAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }

    if (visibilityTimerRef.current) {
      clearTimeout(visibilityTimerRef.current);
    }

    visibilityTimerRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(secureAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsPasswordVisible(false);
      });
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (visibilityTimerRef.current) {
        clearTimeout(visibilityTimerRef.current);
      }
    };
  }, []);

  const animatedInputStyle = {
    opacity: Animated.subtract(1, secureAnim),
  };

  return (
    <>
      <SlideTransition>
        <FormTitle title="비밀번호를 입력해주세요" />
      </SlideTransition>
      <View style={styles.passwordContainer}>
        {/* 일반 텍스트 버전 (보이는 상태) */}
        <Animated.View
          style={[styles.inputWrapper, animatedInputStyle, styles.visibleInput]}
        >
          <FormInput
            placeholder="비밀번호"
            value={currentValue}
            onChangeText={handlePasswordChange}
            secureTextEntry={false}
            autoFocus={isPasswordVisible}
          />
        </Animated.View>

        {/* 보안 텍스트 버전 (가려진 상태) */}
        <Animated.View style={[styles.inputWrapper, { opacity: secureAnim }]}>
          <FormInput
            placeholder="비밀번호"
            value={currentValue}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
            autoFocus={!isPasswordVisible}
          />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  inputWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  visibleInput: {
    zIndex: 1,
  },
});

export default PasswordPage;
