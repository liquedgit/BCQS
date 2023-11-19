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

  useEffect(() => {
    loadingContext.setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        loadingContext.setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log(user);

      if (user) {
        console.log(user);

        try {
          const userRole = await GetUserRole(user.uid);
          console.log(userRole);
          setRole(userRole.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
        loadingContext.setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {}, [loadingContext]);

  if (loadingContext.loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  if (user != null && role == USER_ROLE) {
    return <>{children}</>;
  }

  return <Navigate to={"/login"} replace></Navigate>;
}
