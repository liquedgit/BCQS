import { Navigate } from "react-router-dom";
import { useLoading } from "../../hooks/LoadingContext";
import { USER_ROLE } from "../config/constant";
import { useAuth } from "../../hooks/AuthContext";

export default function UserOnly({ children }: { children: any }) {
  const { user, role } = useAuth();
  const { loading } = useLoading();
  if (user == null && role != USER_ROLE && loading == false) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return <>{children}</>;
}
