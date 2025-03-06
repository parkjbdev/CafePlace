import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderLogo from "@/components/atoms/logo/HeaderLogo";
import { View } from "react-native";

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
        header: (props) => <HeaderLogo viewStyle={{ position: "absolute" }} />,
      }}
    >
      <Tabs.Screen
        name="curation"
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
        name="settings"
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
