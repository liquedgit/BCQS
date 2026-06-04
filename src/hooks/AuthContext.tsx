import { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./LoadingContext";
import { GetUserRole, LocalUser, onAuthStateChanged } from "../model/Auth";

export interface UserContextInterface {
  user: LocalUser | null;
  role: string;
}

const userContext = createContext<UserContextInterface>({ user: null, role: "" });

export default function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [role, setRole] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) { setRole(""); return; }
    GetUserRole(user.uid).then(({ role }) => setRole(role));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <userContext.Provider value={{ user, role }}>
      {children}
    </userContext.Provider>
  );
}

export function useAuth() {
  return useContext(userContext);
}
