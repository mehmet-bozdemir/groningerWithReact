import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  GET_PROFILE_BY_ID,
  CLEAR_PROFILE_BY_ID,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE_BY_ID });
  try {
    let token = localStorage.token;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get("http://groninger.test/api/me", config);
    console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Create / update profile
export const createProfile = (id, fd, history, edit = false) => async (
  dispatch
) => {
  try {
    let token = localStorage.token;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.post(
      `http://groninger.test/api/profiles/${id}`,
      fd,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    //   dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE_BY_ID });
  try {
    let token = localStorage.token;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get("http://groninger.test/api/profiles", config);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    let token = localStorage.token;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(
      `http://groninger.test/api/profiles/${userId}`,
      config
    );

    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
