import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { TENANT_ROLE, USER_ROLE } from "../../lib/config/constant";

export default function Navbar() {
  const nav = useNavigate();
  const { user, role } = useAuth();
  return (
    <>
      <div className="navbar bg-base-100 sticky items-center justify-center">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost font-bold">Home</Link>
          <p className=" pl-5 ">Welcome, {user?.email}</p>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {role === USER_ROLE && (
              <>
                <li>
                  <Link to={"/queue"}>My Queue</Link>
                </li>
              </>
            )}
            {role === TENANT_ROLE && (
              <>
                <li>
                  <Link to={"/queue-tenant"}>All Queue</Link>
                </li>
              </>
            )}
            <li
              onClick={async () => {
                await auth.signOut();
                nav("/login");
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </>
  );
}
