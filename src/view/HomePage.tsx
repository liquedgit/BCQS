import { useAuth } from "../hooks/AuthContext";
import { USER_ROLE } from "../lib/config/constant";
import Navbar from "./Components/NavbarComponent";
import TenantListComponent from "./Components/TenantListComponent";

export default function HomePage() {
  // Example tenant data array

  const { role } = useAuth();

  return (
    <>
      <Navbar />
      {role === USER_ROLE && (
        <>
          <TenantListComponent />
        </>
      )}
    </>
  );
}
