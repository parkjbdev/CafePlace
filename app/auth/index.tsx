import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import NaverLogo from "@/assets/logos/naver.svg";
import AppleLogo from "@/assets/logos/apple.svg";
import GoogleLogo from "@/assets/logos/google.svg";
import KakaoLogo from "@/assets/logos/kakao.svg";
import Logo from "@/components/atoms/logo/Logo";
import { handleAppleLogin } from "@/api/auth";
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
} from "expo-apple-authentication";
import {
  // GoogleSignin,
  GoogleSigninButton,
  // statusCodes,
} from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";

export default function LoginPage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#603F26",
      }}
    >
      <Logo style={{ color: "#FFDBB5" }} />
      <View style={styles.center}>
        {/* <View style={{ margin: 8 }}> */}
        {/*   <Text style={{ color: "#AF8F6F" }}>시작하기</Text> */}
        {/* </View> */}

        {/* <View style={{ gap: 8 }}> */}
        {/*   <AppleAuthenticationButton */}
        {/*     buttonType={AppleAuthenticationButtonType.CONTINUE} */}
        {/*     buttonStyle={AppleAuthenticationButtonStyle.BLACK} */}
        {/*     onPress={() => handleAppleLogin()} */}
        {/*     cornerRadius={5} */}
        {/*     style={{ width: 312, height: 48 }} */}
        {/*   /> */}
        {/*   <GoogleSigninButton size={GoogleSigninButton.Size.Wide} /> */}
        {/* </View> */}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={Platform.OS !== "ios" && styles.disabled}
            activeOpacity={0.7}
            onPress={() => handleAppleLogin()}
          >
            <View style={{ ...styles.logoview, backgroundColor: "#000000" }}>
              <AppleLogo width={20} height={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert("google")}
          >
            <View style={{ ...styles.logoview, backgroundColor: "#FFFFFF" }}>
              <GoogleLogo width={20} height={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={styles.disabled}
            activeOpacity={0.7}
            onPress={() => Alert.alert("kakao")}
          >
            <View style={{ ...styles.logoview, backgroundColor: "#FEE500" }}>
              <KakaoLogo width={35} height={35} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={{ width: 248 }}> */}
      {/*   <TextInput ref={idRef} value="" style={styles.textInput} placeholder="아이디" placeholderTextColor="#AF8F6F" /> */}
      {/*   <TextInput ref={pwRef} value="" style={styles.textInput} secureTextEntry placeholder="비밀번호" placeholderTextColor="#AF8F6F" /> */}
      {/* </View> */}
      {/* <TouchableOpacity onPress={() => handleLogin()}> */}
      {/*   <View style={{ backgroundColor: "#543310", borderRadius: 5, paddingHorizontal: 60, paddingVertical: 16, width: 248, alignItems: "center" }}> */}
      {/*     <Text style={{ color: "white" }}>로그인</Text> */}
      {/*   </View> */}
      {/* </TouchableOpacity> */}

      <View style={{ flexDirection: "row", gap: 32 }}>
        <TouchableOpacity style={{ margin: 8 }}>
          <Link href="/auth">
            <Text style={{ color: "#AF8F6F" }}>로그인</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 8 }}>
          <Link href="/auth/register">
            <Text style={{ color: "#AF8F6F" }}>회원가입</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 8 }}>
          <Link href="/auth/find">
            <Text style={{ color: "#AF8F6F" }}>ID/PW 찾기</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoview: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  center: { justifyContent: "center", alignItems: "center" },
  disabled: { opacity: 0.3 },
  textInput: {
    height: 40,
    padding: 8,
    marginVertical: 4,
    borderBottomWidth: 0.2,
    fontFamily: "CormorantGaramond-Italic",
    fontSize: 16,
    color: "#FFDBB5",
  },
});
