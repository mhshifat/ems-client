import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { PathUtils } from "../../utils";
import { useAuth } from "../hooks";

const Header = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const pathname = location.pathname;
  const isLoggedIn = !!user?.uid;

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">
            EMS
          </Link>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            {isLoggedIn && (
              <Fragment>
                <li
                  className={
                    PathUtils.isSameLocationPath(pathname, "/") ? "active" : ""
                  }
                >
                  <Link to="/">Dashboard</Link>
                </li>
                <li
                  className={
                    PathUtils.isSameLocationPath(pathname, "/task")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/task">Task</Link>
                </li>
                <li
                  className={
                    PathUtils.isSameLocationPath(pathname, "/leave")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/leave">Leave</Link>
                </li>
              </Fragment>
            )}
            <li
              className={
                PathUtils.isSameLocationPath(pathname, "/register")
                  ? "active"
                  : ""
              }
            >
              <Link to="/register">Register</Link>
            </li>
          </ul>
          {/* <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form> */}
          <ul className="nav navbar-nav navbar-right">
            {!isLoggedIn && (
              <li
                className={
                  PathUtils.isSameLocationPath(pathname, "/login")
                    ? "active"
                    : ""
                }
              >
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li
                className={
                  PathUtils.isSameLocationPath(pathname, "/logout")
                    ? "active"
                    : ""
                }
              >
                <Link
                  to="/Logout"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("tid");
                    setUser(null);
                  }}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
