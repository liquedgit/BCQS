import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useLoading } from "../../hooks/LoadingContext";

export default function GuestOnly({ children }: { children: any }) {
  const userState = auth.currentUser;
  const loadingCtx = useLoading();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadingCtx.setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      loadingCtx.setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {}, [loadingCtx.loading]);

  if (loadingCtx.loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  if (userState) {
    return <Navigate to={"/"} replace></Navigate>;
  }

  return <>{children}</>;
}
