import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"; // 또는 react-native-vector-icons 사용

interface PasswordInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const PasswordInput = ({
  value,
  onChangeText,
  placeholder = "비밀번호",
  autoFocus = false,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A89585"
        autoFocus={autoFocus}
        secureTextEntry={!isPasswordVisible}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4C3219",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    height: 56,
  },
  input: {
    flex: 1,
    color: "#F2E2D2",
    fontSize: 16,
    height: "100%",
    padding: 0, // 패딩 제거해 스타일 단순화
  },
  iconButton: {
    padding: 8,
  },
});

export default PasswordInput;
