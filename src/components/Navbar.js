import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-3 px-lg-4">
          <Link
            className="navbar-brand fw-bold fs-4"
            to="/"
            style={{ letterSpacing: "1px" }}
          >
           <img
              src="/nav.png"
              alt="NoteSpace"
              style={{
                width: "140px",
                height: "40px",
                objectFit: "contain"
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item mx-lg-1">
                <Link
                  className={`nav-link px-3 ${
                    location.pathname === "/" ? "active fw-semibold" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item mx-lg-1">
                <Link
                  className={`nav-link px-3 ${
                    location.pathname === "/about" ? "active fw-semibold" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                <Link
                  className="btn btn-outline-light px-4 rounded-pill"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary px-4 rounded-pill"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-danger px-4 rounded-pill mt-3 mt-lg-0"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
