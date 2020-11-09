import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles, getCurrentProfile } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, [getCurrentProfile, getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="d-flex row flex-wrap justify-content-around ">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem
                  key={profile.id}
                  profile={profile}
                  //   currentProfile={auth.user.id}
                />
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Profiles
);
