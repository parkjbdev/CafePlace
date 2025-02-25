// ProgressBar.tsx
import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  stepLength: number;
}

const ProgressBar = ({ currentStep, stepLength }: ProgressBarProps) => {
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / stepLength,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep, stepLength, progressAnim]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: widthInterpolated },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentStep + 1} / {stepLength}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginVertical: 15,
  },
  progressText: {
    textAlign: "right",
    marginTop: 8,
    fontSize: 14,
    color: "#D4BBA7", // 밝은 베이지 (어두운 배경에 대비)
    fontWeight: "500",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#815C42", // 배경보다 약간 밝은 갈색
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#D4A276", // 눈에 잘 띄는 밝은 갈색
    borderRadius: 4,
  },
});

export default ProgressBar;
