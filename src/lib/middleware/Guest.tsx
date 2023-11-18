import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";

export default function GuestOnly({ children }: { children: any }) {
  const userState = auth.currentUser;
  if (!userState) {
    console.log(userState);
    return <>{children}</>;
  }

  return <Navigate to={"/home"}></Navigate>;
}
