// FormTitle.tsx
import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface FormTitleProps {
  title: string;
  description?: string;
  animationValue?: Animated.Value;
}

const FormTitle = ({
  title,
  description,
  animationValue = new Animated.Value(0),
}: FormTitleProps) => {
  React.useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [title]);

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX }], opacity }]}
    >
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F2E2D2", // 매우 밝은 베이지색 (어두운 배경에 대비)
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#D4BBA7", // 밝은 베이지 (어두운 배경에 대비)
    fontWeight: "400",
  },
});

export default FormTitle;
