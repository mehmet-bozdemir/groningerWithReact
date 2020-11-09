import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { createProfile } from "../../actions/profile";

const ProfileForm = ({
  auth: { user, isAuthenticated },
  createProfile,
  history,
  profile: { profile },
}) => {
  const [file, setFile] = useState();
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("image", file);
    fd.append("company", company);
    fd.append("location", location);
    fd.append("story", story);
    createProfile(user.id, fd, history, true);
    setLocation("");
    setCompany("");
    setStory("");
  };

  if (!profile.image) {
    <Spinner />;
  } else {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-secondary">Create Your Profile</h1>
      <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            className="form-control-file"
            type="file"
            accept="image/*"
            name="userImage"
            id="userImage"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            className="form-control"
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => {
              const { value } = e.target;
              setCompany(value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="form-control"
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => {
              const { value } = e.target;
              setLocation(value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea
            className="form-control"
            style={{ height: "150px" }}
            type="text"
            placeholder="Story"
            name="story"
            value={story}
            onChange={(e) => {
              const { value } = e.target;
              setStory(value);
            }}
          />
        </div>
        <input type="submit" className="btn btn-light mx-1 my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(ProfileForm);
