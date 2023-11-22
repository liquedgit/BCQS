import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/AuthContext";

export default function GuestOnly({ children }: { children: any }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={"/"} replace></Navigate>;
  }

  return <>{children}</>;
}
