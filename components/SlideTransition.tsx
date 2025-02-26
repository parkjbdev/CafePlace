import React, { useRef } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle } from "react-native";

interface AnimatedSlideInProps {
  children: React.ReactNode;
  duration?: number;
  onAnimationEnd?: () => void;
  animationValue?: Animated.Value;
  style?: StyleProp<ViewStyle>;
}

const AnimatedSlideIn = ({
  children,
  onAnimationEnd,
  duration = 700,
  style,
}: AnimatedSlideInProps) => {
  // useRef를 사용하여 컴포넌트가 리렌더링되어도 값이 유지되도록 함
  const animationValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // 컴포넌트 마운트 시에만 애니메이션 시작
    const animation = Animated.timing(animationValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      // 애니메이션이 완료된 경우에만 콜백 실행
      if (finished && onAnimationEnd) {
        onAnimationEnd();
      }
    });

    // 클린업 함수에서 애니메이션 중단 처리
    return () => {
      animation.stop();
    };
  }, []); // 의존성 배열이 빈 배열이므로 마운트 시에만 실행

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
      style={[
        styles.container,
        { transform: [{ translateX }], opacity },
        style,
      ]}
    >
      {children}
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

export default AnimatedSlideIn;
