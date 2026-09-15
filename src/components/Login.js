import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const sessionExpired = sessionStorage.getItem("sessionExpired");

    if (sessionExpired) {
      props.showAlert(sessionExpired, "warning");
      sessionStorage.removeItem("sessionExpired");
    }
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      props.showAlert("Please enter email and password", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        },
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Login Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      props.showAlert(
        "Unable to connect to server. Please try again.",
        "danger",
      );
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="p-4 shadow rounded"
        style={{ width: "400px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="text-end mt-2">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
