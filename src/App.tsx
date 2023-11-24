import { Routes, Route, Outlet } from "react-router-dom";
import GuestOnly from "./lib/middleware/Guest";
import LoginPage from "./view/LoginPage";
import RegisterPage from "./view/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingProvider from "./hooks/LoadingContext";
import UserOnly from "./lib/middleware/UserOnly";
import AuthProvider from "./hooks/AuthContext";
import HomePage from "./view/HomePage";
import AuthenticatedOnly from "./lib/middleware/AuthenticatedOnly";
import TenantDetailsPage from "./view/TenantDetailPage";
import QueuePage from "./view/QueuePage";

function App() {
  const Guest = () => {
    return (
      <GuestOnly>
        <Outlet />
      </GuestOnly>
    );
  };

  const User = () => {
    return (
      <UserOnly>
        <Outlet />
      </UserOnly>
    );
  };

  const Authenticated = () => {
    return (
      <AuthenticatedOnly>
        <Outlet />
      </AuthenticatedOnly>
    );
  };

  const Tenant = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route element={<Authenticated />}>
              <Route path={"/"} element={<HomePage />} />
              <Route element={<User />}>
                <Route path="/tenant/:id" element={<TenantDetailsPage />} />
                <Route path="/queue" element={<QueuePage />} />
              </Route>
              <Route element={<Tenant />}>
                <Route path="/products" element={<QueuePage />} />
                <Route path="/queue-tenant" element={<QueuePage />} />
              </Route>
            </Route>
            <Route element={<Guest />}>
              <Route path={"/login"} element={<LoginPage />} />
              <Route path={"/register"} element={<RegisterPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
