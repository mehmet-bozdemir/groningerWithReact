import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_PROFILE_BY_ID,
  CLEAR_PROFILE_BY_ID,
} from "../actions/types";

const initialState = {
  profile: null,
  profileById: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profileById: payload,
        loading: false,
      };
    case CLEAR_PROFILE_BY_ID:
      return {
        ...state,
        profileById: null,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
}
