import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/config/firebase";
import { Link } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <>
      <div className="navbar bg-base-100 sticky">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Welcome, sadasd</a>
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
                  <Link to={"queue"}>
                    <li>
                      <a>Link 2</a>
                    </li>
                  </Link>
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
    </>
  );
}
