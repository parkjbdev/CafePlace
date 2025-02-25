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

const FormInput = ({
  error,
  ...props
}: FormInputProps & TextInputProps) => {
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
          style={styles.input}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#D4BBA7"
          // 고정 높이 유지를 위한 속성 추가
          multiline={false}
          textAlignVertical="center"
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        // 에러 메시지가 없을 때도 같은 높이 유지
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
    backgroundColor: "transparent", // 배경 투명
    paddingHorizontal: 0, // 좌우 패딩 제거
    height: 44, // 고정된 높이 설정
    justifyContent: "center", // 세로 중앙 정렬
    borderWidth: 0, // 테두리 제거
    borderBottomWidth: 1, // 하단 테두리만 추가
    borderBottomColor: "#B38D6D", // 중간 갈색 테두리
  },
  focusedInput: {
    borderBottomColor: "#D4A276", // 밝은 갈색으로 포커스 표시
    borderBottomWidth: 2, // 포커스 시 두께 증가
  },
  errorInput: {
    borderBottomColor: "#FF3B30",
  },
  input: {
    fontSize: 16,
    color: "#F2E2D2", // 밝은 색상 텍스트
    padding: 0,
    height: 22, // 입력 필드 자체 높이 고정
  },
  errorText: {
    marginTop: 4,
    color: "#FF3B30",
    fontSize: 12,
    height: 16, // 오류 텍스트 영역 높이 고정
  },
  errorPlaceholder: {
    height: 20, // 오류 영역과 동일한 높이 (marginTop 포함)
  },
});

export default FormInput;
