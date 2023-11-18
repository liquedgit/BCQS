import { Routes, Route, Outlet } from "react-router-dom";
import GuestOnly from "./lib/middleware/Guest";
import LoginPage from "./view/LoginPage";
import RegisterPage from "./view/RegisterPage";

function App() {
  const Guest = () => {
    return (
      <GuestOnly>
        <Outlet />
      </GuestOnly>
    );
  };

  return (
    <>
      <Routes>
        <Route element={<Guest />}>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
