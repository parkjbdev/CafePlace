import React from 'react';
import { StyleSheet, ViewStyle, Text, View } from 'react-native';

interface IPage {
  item: { num: number; color: string };
  style: ViewStyle;
}

export default function Page({ item, style }: IPage) {
  return (
    <View style={{ ...styles.container, style }}>
      <Text>{item.num}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  }
});
