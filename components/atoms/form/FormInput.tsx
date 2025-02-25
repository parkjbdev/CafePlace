import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

interface FormInputProps {
  secure?: boolean;
  error?: string | null | undefined;
}

const FormInput = ({
  error,
  secure = false,
  ...props
}: FormInputProps & TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
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
        {secure && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Feather
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#D4BBA7"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.errorPlaceholder} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    height: 44,
    justifyContent: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#B38D6D",
    flexDirection: "row",
    alignItems: "center",
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
    flex: 1,
    height: "100%",
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
  iconButton: {
    padding: 8,
  },
});

export default FormInput;
