import * as actionTypes from "./actionTypes";
import firebase from "react-native-firebase";
import { db, geoFirestore } from "../App";
import { FOCUS_LOCATION } from "./actionTypes";

/**
 * Get the Firebase Clud Messaging token, that we'll use to identify the user by.
 * Also set a listener to update token should it change.
 * @returns {Function}
 */
export const fetchFCMToken = () => async (dispatch, getState) => {
  if (getState().getIn(["fcmToken", "token"])) {
    console.log("FCM token already stored. Will not fetchFCMToken");
    return;
  }

  dispatch({ type: actionTypes.FETCH_FCM_TOKEN_REQUEST });

  try {
    const token = await firebase.messaging().getToken();
    dispatch({ type: actionTypes.FETCH_FCM_TOKEN_SUCCESS, token });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_FCM_TOKEN_FAILURE,
      error: error.message
    });
  }

  this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
    dispatch({ type: actionTypes.FETCH_FCM_TOKEN_SUCCESS, token });
  });
};

/**
 * Retrieve any existing user data associated with the FCM token
 * @returns {Function}
 */
export const fetchUser = () => async (dispatch, getState) => {
  const fcmToken = getState().getIn(["fcmToken", "token"]);
  if (!fcmToken) {
    console.log("No FCM token. Will not fetchUser");
    return;
  }

  dispatch({ type: actionTypes.FETCH_USER_REQUEST });

  try {
    const userQuery = await db
      .collection("users")
      .doc(fcmToken)
      .get();

    let userData = false;
    if (userQuery.exists) {
      userData = userQuery.data();
    }

    dispatch({ type: actionTypes.FETCH_USER_SUCCESS, userData });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_USER_FAILURE, error: error.message });
  }
};

/**
 * Save user location to Firestore and update state
 * @param location
 * @returns {Function}
 */
export const setUserLocation = location => async (dispatch, getState) => {
  const fcmToken = getState().getIn(["fcmToken", "token"]);

  const userData = {
    location,
    searchRadius: 5 // default
  };

  dispatch({ type: actionTypes.FETCH_USER_REQUEST });

  db.collection("users")
    .doc(fcmToken)
    .set(userData)
    .then(() => {
      dispatch({ type: actionTypes.FETCH_USER_SUCCESS, userData });
    })
    .catch(error => {
      dispatch({ type: actionTypes.FETCH_USER_FAILURE, error: error.message });
    });
};

/**
 * Retrieve Planning Applications within the user's search radius
 * @returns {Function}
 */
export const fetchUserPlanningApps = () => async (dispatch, getState) => {
  const user = getState().app.user.data;
  if (!user.location) {
    console.log("No user! Will not fetchUserPlanningApps");
    return;
  }
  dispatch({ type: actionTypes.FETCH_PLANNING_APPS_REQUEST });
  try {
    // Perform a geo-hashed search
    const geoCollection = geoFirestore.collection("planningLocations");
    console.log(
      `SEARCHING LAT ${user.location.latitude}, LON ${user.location.longitude}`
    );
    const query = geoCollection.near({
      center: new firebase.firestore.GeoPoint(
        user.location.latitude,
        user.location.longitude
      ),
      radius: user.searchRadius // km
    });
    const results = await query.get();

    let planningAppsData = [];
    results.forEach(doc => planningAppsData.push(doc.data()));

    dispatch({
      type: actionTypes.FETCH_PLANNING_APPS_SUCCESS,
      planningAppsData
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_PLANNING_APPS_FAILURE,
      error: error.message
    });
  }
};

export const setFocusedLocation = index => ({ type: FOCUS_LOCATION, index });
