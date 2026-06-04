import { useAuth } from "../hooks/AuthContext";
import { ADMIN_ROLE, TENANT_ROLE, USER_ROLE } from "../lib/config/constant";
import Navbar from "./Components/NavbarComponent";
import TenantListComponent from "./Components/TenantListComponent";
import TenantHomePage from "./TenantHomePage";

export default function HomePage() {
  const { role } = useAuth();

  return (
    <>
      <Navbar />
      {role === USER_ROLE && <TenantListComponent />}
      {role === TENANT_ROLE && <TenantHomePage />}
      {role === ADMIN_ROLE && (
        <>
          <div className="p-10">
            <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
            <p className="text-sm opacity-60 mb-6">Overview of all tenants</p>
          </div>
          <TenantListComponent />
        </>
      )}
    </>
  );
}
