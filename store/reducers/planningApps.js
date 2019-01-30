/**
 * Planning Applications reducer
 *
 * This stores the planning applications relevant to the user that we've pulled from the firestore DB
 */

import { fromJS } from "immutable";

import * as actionTypes from "../actionTypes";

const initialState = fromJS({
  loading: false,
  error: false,
  planningAppsData: false
});

function planningAppsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PLANNING_APPS_REQUEST:
      return state.set("loading", true).set("error", false);

    case actionTypes.FETCH_PLANNING_APPS_SUCCESS:
      return state
        .set("planningAppsData", action.planningAppsData)
        .set("loading", false);

    case actionTypes.FETCH_PLANNING_APPS_FAILURE:
      return state.set("error", action.error).set("loading", false);

    default:
      return state;
  }
}

export default planningAppsReducer;
