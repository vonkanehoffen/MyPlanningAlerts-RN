/**
 * User reducer
 *
 * This stores our user data locally. Such as location and preferred search radius.
 */

import { fromJS } from "immutable";

import * as actionTypes from "../actionTypes";

const initialState = fromJS({
  loading: true, // Not true initially, but we need AuthLoadingScreen not to redirect on init.
  error: false,
  userData: {
    location: false,
    searchRadius: false
  },
  focusedLocation: false
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_REQUEST:
      return state.set("loading", true).set("error", false);

    case actionTypes.FETCH_USER_SUCCESS:
      return state.set("userData", action.userData).set("loading", false);

    case actionTypes.FETCH_USER_FAILURE:
      return state.set("error", action.error).set("loading", false);

    // This is just to locally set which location the user's selected in the UI.
    case actionTypes.FOCUS_LOCATION:
      return state.set("focusedLocation", action.index);

    default:
      return state;
  }
}

export default userReducer;
