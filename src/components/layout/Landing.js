import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="landing-inner">
        <h2 className="display-2 landing-name p-2">Groninger</h2>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary mx-1">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light mx-1">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
