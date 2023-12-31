import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useLoading } from "../../hooks/LoadingContext";
import { TENANT_ROLE } from "../config/constant";

export default function TenantOnly({ children }: { children: any }) {
  const { user, role } = useAuth();
  const { loading } = useLoading();
  if (user == null && role != TENANT_ROLE && loading == false) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return <>{children}</>;
}
