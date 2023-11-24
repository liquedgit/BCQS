import { useAuth } from "../hooks/AuthContext";
import { TENANT_ROLE, USER_ROLE } from "../lib/config/constant";
import Navbar from "./Components/NavbarComponent";
import TenantListComponent from "./Components/TenantListComponent";
import TenantHomePage from "./TenantHomePage";

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
      {role === TENANT_ROLE && (
        <>
          <TenantHomePage />
        </>
      )}
    </>
  );
}
