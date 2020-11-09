import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById, getCurrentProfile } from "../../actions/profile";

const Profile = ({
  getProfileById,
  getCurrentProfile,
  profile: { loading, profileById },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getCurrentProfile();
  }, [getProfileById, match.params.id, getCurrentProfile]);
  return (
    <div>
      {profileById === null || loading ? (
        <Spinner />
      ) : (
        <div className="col-md-12">
          <div className="text-center">
            <Link
              to="/profiles"
              className="btn btn-sm btn-outline-secondary m-1"
            >
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user.id === profileById.id && (
                <Link to="#" className="btn btn-sm btn-outline-secondary m-1">
                  Edit Profile
                </Link>
              )}
          </div>
          <div class=" d-flex card shadow p-3  my-3 bg-white rounded align-items-center justify-content-center">
            <div class="d-flex">
              <img
                src={`http://groninger.test/storage/${profileById.image}`}
                className="card-img-top mx-auto rounded-circle"
                style={{ width: "200px", height: "200px" }}
                alt="..."
              />
            </div>
            <div class="card-body text-center align-items-center justify-content-center">
              <h1 class="card-title">{profileById.name}</h1>
              <h2 class=" d-inline-block rounded px-2 bg-dark text-white font-italic">
                Story
              </h2>
              <p class="card-text">{profileById.story}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getCurrentProfile })(
  Profile
);
