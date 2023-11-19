import { Routes, Route, Outlet } from "react-router-dom";
import GuestOnly from "./lib/middleware/Guest";
import LoginPage from "./view/LoginPage";
import RegisterPage from "./view/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingProvider from "./hooks/LoadingContext";
import UserOnly from "./lib/middleware/UserOnly";
import HomePage from "./view/HomePage";

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

  return (
    <>
      <LoadingProvider>
        <ToastContainer />
        <Routes>
          <Route element={<Guest />}>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
          </Route>
          <Route element={<User />}>
            <Route path={"/"} element={<HomePage />} />
          </Route>
        </Routes>
      </LoadingProvider>
    </>
  );
}

export default App;
