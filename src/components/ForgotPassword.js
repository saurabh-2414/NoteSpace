import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      props.showAlert("Please enter your email address", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/forgotpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const json = await response.json();

      if (json.success) {
        props.showAlert(json.message, "success");
        setEmail("");
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
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
        <h2 className="text-center mb-2">Forgot Password?</h2>

        <p className="text-center text-muted mb-4">
          Enter your registered email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
