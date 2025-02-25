import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FormTitleProps {
  title: string;
  description?: string;
}

const FormTitle = ({ title, description }: FormTitleProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F2E2D2",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#D4BBA7",
    fontWeight: "400",
  },
});

export default FormTitle;
