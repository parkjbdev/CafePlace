import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function OrderPage() {
  return <ScrollView>
    <SafeAreaView />
    <ThemedText>Order Page</ThemedText>
    <View style={{ height: 1000 }} />
  </ScrollView>
}
