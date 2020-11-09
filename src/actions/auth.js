import axios from "axios";
import api from "../utils/api";
import { setAlert } from "./alert";
// import setAuthToken from "../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  //   CLEAR_PROFILE
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }

  let token = localStorage.token;
  // console.log(localStorage.token);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.get("http://groninger.test/api/user", config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      "http://groninger.test/api/register",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await axios.post(
      "http://groninger.test/api/authenticate",
      body
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
  // console.log(localStorage.token);
};

// Logout
export const logout = () => ({ type: LOGOUT });
