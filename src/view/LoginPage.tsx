import { useState } from "react";
import { AuthLoginController } from "../controller/AuthController";
import { toastError, toastSuccess } from "../lib/config/toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await AuthLoginController(email, password);
    if (res == null) {
      toastError("Login failed !");
    } else {
      toastSuccess("Succesfully logged in !");
      nav("/");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="card shrink-0 w-full max-w-sm shadow-2xl">

        <h1 className="flex justify-center item-center pt-5 text-3xl font-bold">Login</h1>

        <form
          className="card-body"
          onSubmit={async (e) => await handleOnSubmit(e)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <Link to="/register" className="label-text-alt link link-hover">Sign Up</Link>
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
