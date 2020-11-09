import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const ProfileItem = ({
  profile: { id, image, name, company, location, created_at },
  auth,
}) => {
  return (
    <div className="d-flex card shadow p-3  my-3 bg-white rounded align-items-center justify-content-center">
      <div className="d-flex">
        <Link to={`/profile/${id}`}>
          <img
            src={`http://groninger.test/storage/${image}`}
            className="card-img-top mx-auto rounded-circle"
            style={{ width: "200px", height: "200px" }}
            alt="..."
          />
        </Link>
      </div>
      <div className="card-body text-center align-items-center justify-content-center">
        <h3 className="card-title">{name}</h3>
        <h6 className="font-italic text-muted">
          Joined on <Moment format="MMMM Do YYYY">{created_at}</Moment>
        </h6>
        <span className="badge badge-dark font-italic">Company</span>
        <h3 className="card-text">{company}</h3>
        <span className="badge badge-dark">Location</span>
        <p className="card-text">{location}</p>
        <div>
          <Link
            to={`/profile/${id}`}
            className="btn btn-sm btn-outline-secondary m-1"
          >
            VIEW PROFILE
          </Link>
          {auth.user && auth.user.id === id && (
            <Link to="#" className="btn btn-sm btn-outline-danger m-1">
              <i className="far fa-trash-alt fa-lg"></i>
            </Link>
          )}
        </div>
        <div className="d-flex justify-content-around border-top mx-0 mt-3 pt-3 text-muted font-italic">
          <h6 className="mr-2">... posts</h6>
          <h6 className="mx-1">... followers</h6>
          <h6 className="ml-2">... following</h6>
        </div>
        {/* @if(auth()->user() != $user)
            @if(auth()->user()->isNot($user))
                     @unless(auth()->user()->is($user)) */}
        <div className="d-flex align-items-center justify-content-center">
          {/* <form method="POST" action="/profiles/{{$user->id}}/follow"> */}
          <button
            type="submit"
            className="btn btn-sm btn-outline-secondary m-1"
          >
            Follow / Unfollow
            {/* {{auth()->user()->isFollowing($user) ? 'UNFOLLOW' : 'FOLLOW'}} */}
          </button>
          {/* </form> */}
        </div>
        {/* @endif */}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfileItem);
