import { createContext, useContext, useEffect, useState } from "react";
import { Session } from '@supabase/supabase-js';
import supabase from "@/api/supabase";
import { router } from "expo-router";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session) {
        router.replace('/(tabs)/curations');
      } else {
        router.replace('/auth/login')
      }
    })
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>
    {children}
  </AuthContext.Provider>

}
export default AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

