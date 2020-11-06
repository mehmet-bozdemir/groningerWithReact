import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="landing">
        <div className="landing-inner">
          <h1 className="large text-light">Sign Up</h1>
          <p className="lead text-light">
            <i className="fas fa-user text-light" /> Create Your Account
          </p>
          <form className="landing-form p-2" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
          <p className="my-1 text-light">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-light">Sign In</span>
            </Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
