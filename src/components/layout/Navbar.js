import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  profile: { profile },
  logout,
}) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          to={!loading && isAuthenticated && user ? "/posts" : "/"}
          className="navbar-brand d-flex justify-content-center align-items-center"
        >
          <div>
            <img
              src={require("./groningen-logo.png").default}
              alt="navbarBrand"
              style={{ height: "40px" }}
              className="rounded-circle mx-1"
            />
          </div>
          <div style={{ fontSize: "2rem" }}>Groninger</div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          style={{ fontSize: "1.5rem" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link d-flex">
                <i className="fas fa-user m-1" />
                <span className="d-none d-sm-block"> Dashboard</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/posts" className="nav-link d-flex">
                <i className="fas fa-blog m-1" />
                <span className="d-none d-sm-block">Posts</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/profiles" className="nav-link d-flex">
                <i className="fas fa-users m-1"></i>
                <span className="d-none d-sm-block"> Profiles</span>
              </Link>
            </li>
            {!loading && isAuthenticated && user ? (
              <li className="nav-item active">
                <Link to="/" className="nav-link d-flex" onClick={logout}>
                  <i className="fas fa-sign-out-alt m-1" />
                  <span className="d-none d-sm-block"> Logout</span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {!loading && !isAuthenticated && !user ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/login" className="nav-link d-flex">
                  <i className="fas fa-sign-in-alt"></i>
                  <span className="d-none d-sm-block"> Login</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/register" className="nav-link d-flex">
                  <i className="fas fa-user-plus"></i>
                  <span className="d-none d-sm-block">Register</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link d-flex">
                  <img
                    src={`http://groninger.test/storage/${
                      profile && profile.image
                    }`}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                    className="card-img rounded-circle mr-2"
                    alt="..."
                  />
                  <span>{user && user.name}</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
