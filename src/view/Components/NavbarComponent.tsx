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
      <div className="navbar bg-base-100 sticky">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">Home</Link>
          <p className=" pl-5 text-xl">Welcome, {user?.email}</p>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary >Menu</summary>
                <ul className="p-2 bg-base-100">
                  {role === USER_ROLE && (
                    <>
                      <li>
                        <Link className="whitespace-nowrap" to={"/queue"}>My Queue</Link>
                      </li>
                    </>
                  )}
                  {role === TENANT_ROLE && (
                    <>
                      <li>
                        <Link className="whitespace-nowrap" to={"/queue"}>All Queue</Link>
                      </li>
                      <li>
                        <Link className="whitespace-nowrap" to={"/products"}>My Products</Link>
                      </li>
                    </>
                  )}




                </ul>
              </details>
            </li>
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
