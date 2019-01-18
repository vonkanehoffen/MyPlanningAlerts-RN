import { combineReducers } from "redux";
import u from "updeep";
import * as actionTypes from "./actionTypes";
import { UNINITIALIZED } from "./constants";

const initialState = {
  fcmToken: {
    fetching: false,
    error: false,
    token: false
  },
  user: {
    fetching: false,
    error: false,
    data: UNINITIALIZED
  },
  planningApps: {
    fetching: false,
    error: false,
    data: false
  },
  focusedLocation: false
};

function app(state = initialState, action) {
  // console.log("reducer called", action);
  switch (action.type) {
    case actionTypes.FETCH_FCM_TOKEN:
      return u(
        {
          fcmToken: {
            fetching: action.fetching || false,
            error: action.error,
            token: action.token
          }
        },
        state
      );
    case actionTypes.FETCH_USER:
      return u(
        {
          user: {
            fetching: action.fetching || false,
            error: action.error,
            data: action.data
          }
        },
        state
      );
    case actionTypes.FETCH_PLANNING_APPS:
      return u(
        {
          planningApps: {
            fetching: action.fetching || false,
            error: action.error || false,
            ...(action.data && { data: action.data })
          }
        },
        state
      );
    case actionTypes.FOCUS_LOCATION:
      return u(
        {
          focusedLocation: action.index
        },
        state
      );
    default:
      return state;
  }
}

const rootReducer = combineReducers({ app });
export default rootReducer;
