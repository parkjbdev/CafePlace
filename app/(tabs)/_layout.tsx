import { Stack, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Logo from "@/components/atoms/logo/Logo";
import { SafeAreaView, View } from "react-native";
import HeaderLogo from "@/components/atoms/logo/HeaderLogo";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        // tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        // tabBarBackground: Colors[colorScheme ?? 'light'].background,
        headerShown: false,
        header: (props) => <HeaderLogo />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "큐레이션",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cafe" : "cafe-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "지도",
          headerShown: true,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "map" : "map-outline"} color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="mybookmarks"
        options={{
          title: '북마크',
          headerShown: true,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bookmarks' : 'bookmarks-outline'} color={color} />
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="order"
        options={{
          title: '주문',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="myinfo"
        options={{
          title: "내 정보",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
