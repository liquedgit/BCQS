import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/config/firebase";
import { useLoading } from "./LoadingContext";
import { GetUserRole } from "../model/Auth";

export interface UserContextInterface {
  user: User | null;
  role: String;
}

const userContext = createContext<UserContextInterface>({
  user: null,
  role: "",
});

export default function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchUserRole = async () => {
        try {
          const userRole = await GetUserRole(user.uid);
          setRole(userRole.role);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
      fetchUserRole();
    }
  }, [user]);

  useEffect(() => {}, [loading]);

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
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
