/**
 * Firebase cloud messaging token reducer
 *
 * This stores the unique token Firebase gives us to identify our user.
 */

import { fromJS } from "immutable";

import * as actionTypes from "../actionTypes";

const initialState = fromJS({
  loading: false,
  error: false,
  token: false
});

function fcmTokenReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_FCM_TOKEN_REQUEST:
      return state.set("loading", true).set("error", false);

    case actionTypes.FETCH_FCM_TOKEN_SUCCESS:
      return state.set("token", action.token).set("loading", false);

    case actionTypes.FETCH_FCM_TOKEN_FAILURE:
      return state.set("error", action.error).set("loading", false);

    default:
      return state;
  }
}

export default fcmTokenReducer;
