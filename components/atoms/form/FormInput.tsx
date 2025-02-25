import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";

interface FormInputProps {
  error?: string | null | undefined;
}

const FormInput = ({ error, ...props }: FormInputProps & TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInput : null,
          error ? styles.errorInput : null,
        ]}
      >
        <TextInput
          style={[styles.input, props.style]}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#D4BBA7"
          multiline={false}
          textAlignVertical="center"
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.errorPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    height: 44,
    justifyContent: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#B38D6D",
  },
  focusedInput: {
    borderBottomColor: "#D4A276",
    borderBottomWidth: 2,
  },
  errorInput: {
    borderBottomColor: "#FF3B30",
  },
  input: {
    fontSize: 16,
    color: "#F2E2D2",
    padding: 0,
  },
  errorText: {
    marginTop: 4,
    color: "#FF3B30",
    fontSize: 12,
    height: 16,
  },
  errorPlaceholder: {
    height: 20,
  },
});

export default FormInput;
