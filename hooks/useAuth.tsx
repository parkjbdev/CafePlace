import supabase from "@/api/supabase";
import {
  authLoadingAtom,
  authStateAtom,
  sessionAtom,
  userAtom,
} from "@/atoms/authAtoms";
import { AuthError, Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [authState, setAuthState] = useAtom(authStateAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [loading, setLoading] = useAtom(authLoadingAtom);

  const handleSession = (session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);
    setAuthState({
      isLoading: false,
      isAuthenticated: !!session,
      error: null,
    });

    return;
  };

  const initialize = () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => handleSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleSession(session);

      if (event === "SIGNED_IN") {
        router.replace("/(tabs)/curation");
      } else if (event === "SIGNED_OUT") {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    return initialize();
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      alert((error as AuthError).message);
      setAuthState((prev) => ({ ...prev, error: error as null | AuthError }));
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({
    name,
    email,
    password,
    userData,
  }: {
    name: string;
    email: string;
    password: string;
    userData?: object;
  }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            ...userData
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, error: error as null | AuthError }));
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, error: error as null | AuthError }));
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, error: error as null | AuthError }));
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    authState,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    initialize,
  };
};

export default useAuth;
