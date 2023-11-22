import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useLoading } from "../../hooks/LoadingContext";

export default function AuthenticatedOnly({ children }: { children: any }) {
  const { user } = useAuth();
  const { loading } = useLoading();

  if (user == null && loading == false) {
    return <Navigate to={"/login"} replace></Navigate>;
  }
  return <>{children}</>;
}
