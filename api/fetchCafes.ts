import { router } from "expo-router";
import supabase from "./supabase";

export const fetchDetails = async (start = 0, limit = 20) => {
  return await fetch(`https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/863dc82b56c94070879b3cfa2c706b1f/bookmarks?placeInfo=true&start=${start}&limit=${limit}&sort=lastUseTime`)
    .then(res => res.json())
    .then(data => data.bookmarkList)
}

export const fetchSummary = async () => {
  return await fetch(`https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/863dc82b56c94070879b3cfa2c706b1f/bookmarks?sort=lastUseTime`)
    .then(res => res.json())
    .then(data => data.bookmarkList)
}


export async function fetcher() {
  const { data } = await supabase.from("cafes").select();
  console.log({ data })
  return data
}

async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    throw error
    // throw new Error('로그인 실패')
  } else {
    router.replace('/')
  }
}


const refreshToken = async () => {
}

const handleLogout = async () => {
}
