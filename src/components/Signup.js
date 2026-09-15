import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confpassword } = credentials;

    if (!name || !email || !password || !confpassword) {
      props.showAlert("Please fill all the fields", "warning");
      return;
    }

    if (password !== confpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const json = await response.json();

      if (json.success) {
        props.showAlert("Account created successfully", "success");
        navigate("/login");
      } else {
        props.showAlert(json.message || "Unable to create account", "danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
        <h2 className="text-center mb-4">Create an Account</h2>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                onChange={onChange}
                autoComplete="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                onChange={onChange}
                autoComplete="email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
                  minLength={5}
                  required
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confpassword" className="form-label">
                Confirm Password
              </label>

              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confpassword"
                  name="confpassword"
                  value={credentials.confpassword || ""}
                  onChange={onChange}
                  minLength={5}
                  required
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
