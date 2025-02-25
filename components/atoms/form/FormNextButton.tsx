import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface FormNextButtonProps {
  handleNext: TouchableOpacityProps["onPress"];
  children?: React.ReactNode;
  valid?: boolean;
}

const FormNextButton = ({
  children,
  handleNext,
  valid,
}: FormNextButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.nextButton,
        !valid ? styles.disabledButton : null,
      ]}
      onPress={handleNext}
      disabled={!valid}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#815C42", // 배경보다 약간 밝은 갈색
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "#6C4E31", // 원래 색상으로 복원
    flex: 2,
  },
  submitButton: {
    backgroundColor: "#8B6B43", // 더 어두운 갈색
    flex: 2,
  },
  disabledButton: {
    backgroundColor: "#9C7A5B", // 중간 갈색
    opacity: 0.7,
  },
  buttonText: {
    color: "white", // 원래 색상으로 복원
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormNextButton;
