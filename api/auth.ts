import { Alert, Platform } from "react-native"
import supabase from "./supabase"
import * as AppleAuth from "expo-apple-authentication"
import { CodedError } from "expo-modules-core"

export const login = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}

export const logout = async () => {
  return await supabase.auth.signOut()
}


export const handleAppleLogin = async () => {
  // try {
  // } catch (e) {
  //   if (e instanceof CodedError) {
  //     if (e.code === "ERR_REQUEST_CANCELED") {
  //       Alert.alert(e.message)
  //     }
  //   }
  // }
  if (Platform.OS !== 'ios') {
    Alert.alert('Apple 로그인은 iOS에서만 가능합니다.')
    return
  }

  const credential = await AppleAuth.signInAsync({
    requestedScopes: [
      AppleAuth.AppleAuthenticationScope.FULL_NAME,
      AppleAuth.AppleAuthenticationScope.EMAIL,
    ]
  })

  if (credential.identityToken) {
    const { error, data: { user } } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
    })
    // console.log(JSON.stringify({ error, user }, null, 2))
    if (!error) {
      // Alert.alert("로그인 성공")
    }
  } else {
    console.error('No IdentityToken')
    throw new Error('No IdentityToken')
  }

  console.log(credential)
}
