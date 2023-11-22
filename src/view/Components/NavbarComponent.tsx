import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export default function Navbar() {
  const nav = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <div className="navbar bg-base-100 sticky">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Welcome, {user?.email}</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <Link to={"queue"}>Link 2</Link>
                  </li>
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
