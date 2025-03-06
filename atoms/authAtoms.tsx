import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as JotaiAsyncStorage } from "jotai/vanilla/utils/atomWithStorage";

export type UserState = User | null;

const storage: JotaiAsyncStorage<UserState> = createJSONStorage(
  () => AsyncStorage,
);

export const userAtom = atomWithStorage<UserState>("auth", null, storage);
export const sessionAtom = atom<Session | null>(null);
export const authStateAtom = atom<{
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
}>({
  isLoading: true,
  isAuthenticated: false,
  error: null,
});
export const authLoadingAtom = atom(false);
