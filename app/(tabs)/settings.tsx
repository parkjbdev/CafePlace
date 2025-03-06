import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SectionList } from "@/components/SectionList";
import { SectionElement } from "@/components/SectionList";
import { useEffect, useState } from "react";
// import { logout } from "@/api/auth";
import supabase from "@/api/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import Logo from "@/components/atoms/logo/Logo";
import packageJson from "@/package.json";
import useAuth from "@/hooks/useAuth";
interface MyInfoPageProps {
  auth: boolean;
}

export default function Settings({ auth }: MyInfoPageProps) {
  const { user, session, authState, loading, signIn, signUp, signOut } =
    useAuth();

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = await supabase.auth.getUserIdentities();
    console.log(id.data?.identities);
    // setUser(user);
    console.log(user?.user_metadata);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 0 }}>
      <SafeAreaView />
      <Logo style={{ margin: 16 }} />

      <SectionList title="Account">
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
          style={styles.profile}
        >
          <Image
            alt=""
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
            }}
            style={styles.profileAvatar}
          />
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>
              {user?.user_metadata["display_name"]}
            </Text>
            <Text style={styles.profileHandle}>{user?.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#bcbcbc" />
        </TouchableOpacity>
      </SectionList>

      <SectionList title="Preferences">
        <SectionElement isFirst isLast label="Dark Mode" hideChevron>
          <Switch
            onValueChange={() => { }}
            style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
          />
        </SectionElement>
      </SectionList>

      <SectionList>
        <SectionElement
          isFirst
          isLast
          hideChevron
          label="Log Out"
          textStyle={{
            width: "100%",
            textAlign: "center",
            fontWeight: "600",
            color: "#dc2626",
          }}
          onPress={signOut}
        />
      </SectionList>

      <Text
        style={{
          marginVertical: 24,
          fontSize: 13,
          fontWeight: "500",
          textAlign: "center",
          color: "#a69f9f",
        }}
      >
        {packageJson.name} v{packageJson.version}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
});
