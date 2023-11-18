import { GetUserRole } from "../../model/Auth";
import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserOnly({ children }: { children: any }) {
  const userState = auth.currentUser;
  const [role, setRole] = useState("");

  if (userState) {
    return <>{children}</>;
  }

  return <Navigate to={"/login"}></Navigate>;
}
