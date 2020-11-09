import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  // console.log(user.id);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <div className="col-12 justify-content-between align-items-center text-center">
        <div>
          <h1 className="large text-secondary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
        </div>
        {(profile && profile.image) === null ? (
          <Fragment>
            <p>You have not setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-secondary my-1">
              Create Profile
            </Link>
          </Fragment>
        ) : (profile && profile.image) !== null ? (
          <div>
            <div>
              <img
                src={`http://groninger.test/storage/${
                  profile && profile.image
                }`}
                style={{ width: 100, height: 100 }}
                className="card-img rounded-circle"
                alt="..."
              />
            </div>
            <Link
              to="/posts"
              className="btn  mt-2 py-0 px-0 btn-light d-inline-block"
            >
              <p className="h4 font-italic" style={{ fontFamily: "cursive" }}>
                Discover <span className="text-secondary">Groningen</span>
              </p>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
