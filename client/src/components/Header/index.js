import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-light" to="/">
          <h1 className="m-0" style={{ fontSize: "3rem" }}>
            Haunted Caverns
          </h1>
        </Link>
        <p
          className="m-0"
          style={{ fontSize: "1.75rem", fontWeight: "700" }}
        ></p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
