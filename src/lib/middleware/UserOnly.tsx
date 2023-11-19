import { AuthSignOut, GetUserRole } from "../../model/Auth";
import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../../hooks/LoadingContext";
import { User } from "firebase/auth";
import { USER_ROLE } from "../config/constant";

export default function UserOnly({ children }: { children: any }) {
  const [role, setRole] = useState("");
  const loadingContext = useLoading();
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    loadingContext.setLoading(true);
    setAuthState(false);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      loadingContext.setLoading(false);
      setAuthState(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user && authState) {
      loadingContext.setLoading(true);
      const fetchUserRole = async () => {
        try {
          const userRole = await GetUserRole(user.uid);
          console.log(userRole);
          setRole(userRole.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
        loadingContext.setLoading(false);
      };
      fetchUserRole();
    }
  }, [user, authState]);

  useEffect(() => {}, [loadingContext, authState]);

  if (loadingContext.loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }
  if (user == null && role != USER_ROLE && authState) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return <>{children}</>;
}
