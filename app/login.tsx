import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import NaverLogo from '@/assets/logos/naver.svg';
import AppleLogo from '@/assets/logos/apple.svg';
import GoogleLogo from '@/assets/logos/google.svg';
import KakaoLogo from '@/assets/logos/kakao.svg';
import { router } from "expo-router";
import Logo from "@/components/Logo";

export default function Page() {
  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#603F26" }}>
    <Logo style={{ color: "#FFDBB5" }} />
    <View style={{ width: 248 }}>
      <TextInput value="" style={{ height: 40, padding: 8, marginVertical: 4, borderBottomWidth: 0.2, fontFamily: 'CormorantGaramond-Italic', fontSize: 16, color: "#FFDBB5" }} placeholder="아이디" placeholderTextColor="#AF8F6F" />
      <TextInput value="" style={{ height: 40, padding: 8, marginVertical: 4, borderBottomWidth: 0.2, fontFamily: 'CormorantGaramond-Italic', fontSize: 16, color: "#FFDBB5" }} secureTextEntry placeholder="비밀번호" placeholderTextColor="#AF8F6F" />
    </View>
    <TouchableOpacity onPress={() => router.replace('/')}>
      <View style={{ backgroundColor: "#543310", borderRadius: 5, paddingHorizontal: 60, paddingVertical: 16, width: 248, alignItems: "center" }}>
        <Text style={{ color: "white" }}>로그인</Text>
      </View>
    </TouchableOpacity>


    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert("apple")}>
        <View style={{ ...styles.logoview, backgroundColor: "#000000" }} >
          <AppleLogo width={20} height={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert("google")}>
        <View style={{ ...styles.logoview, backgroundColor: "#FFFFFF" }}>
          <GoogleLogo width={20} height={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert("naver")}>
        <View style={{ ...styles.logoview, backgroundColor: "#03C75A" }}>
          <NaverLogo width={40} height={40} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert("kakao")}>
        <View style={{ ...styles.logoview, backgroundColor: "#FEE500" }}>
          <KakaoLogo width={35} height={35} />
        </View>
      </TouchableOpacity>
    </View>

    <View style={{ flexDirection: "row", gap: 32 }}>
      <TouchableOpacity style={{ margin: 8 }}>
        <Text style={{ color: "#AF8F6F" }}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ margin: 8 }}>
        <Text style={{ color: "#AF8F6F" }}>ID/PW 찾기</Text>
      </TouchableOpacity>
    </View>

  </View >
}

const styles = StyleSheet.create({
  logoview: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  }
})
