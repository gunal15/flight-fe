import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  let navigate = useNavigate();
  let handleLogout = () => {
    navigate("/");
    // localStorage.removeItem("react_app_token");
    localStorage.clear();
  };
  let navUser = localStorage.getItem("username");
  return (
    <>
      <div className="container-fluid bg-danger">
        <div className="row ">
          <Link
            className="col  m-3 text-white fs-5 pointer"
            to={`/dashboard/${localStorage.getItem("userid")}`}
          >
            EaseMyTrip
          </Link>
          <div className="col d-flex justify-content-end align-items-center">
            <div className="text-white me-2">{navUser}</div>

            <div class="dropdown">
              <CgProfile
                className="text-white fs-2 me-3 pointer dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />

              <ul className="dropdown-menu">
                <li>
                  <Link
                    to={`/allticket/${localStorage.getItem("userid")}`}
                    className="dropdown-item"
                  >
                    View Your Bookings
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => handleLogout()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleLogout()}
              className="btn btn-light text-dark"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
