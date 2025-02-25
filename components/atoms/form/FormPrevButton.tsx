
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface FormPrevButtonProps {
  onPress: () => void;
  label?: string;
  children?: React.ReactNode;
}

const FormPrevButton = ({ onPress, label = "이전" }: FormPrevButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,

  },
  buttonText: {
    color: "#815C42",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default FormPrevButton
