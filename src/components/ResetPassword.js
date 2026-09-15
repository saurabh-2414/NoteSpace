import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = (props) => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      props.showAlert("Please fill all the fields", "warning");
      return;
    }

    if (password.length < 5) {
      props.showAlert("Password must be at least 5 characters", "warning");
      return;
    }

    if (password !== confirmPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/resetpassword/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      const json = await response.json();

      if (json.success) {
        props.showAlert("Password reset successfully", "success");
        navigate("/login");
      } else {
        props.showAlert(json.message || "Unable to reset password", "danger");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      props.showAlert(
        "Unable to connect to server. Please try again.",
        "danger",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm border-0 rounded-4 p-4">
        {resetError ? (
          <div className="text-center">
            <div className="mb-3" style={{ fontSize: "50px" }}>
              ⚠️
            </div>

            <h2 className="mb-3">Invalid or Expired Link</h2>

            <p className="text-muted">{resetError}</p>

            <Link
              to="/forgot-password"
              className="btn btn-dark rounded-pill px-4 mt-2"
            >
              Request New Reset Link
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4">Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    required
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
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>

                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    required
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
                className="btn btn-dark w-100 rounded-pill"
                disabled={loading}
              >
                {loading ? "Resetting password..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
