import * as actionTypes from "./actionTypes";
import firebase from "react-native-firebase";
import { db, geoFirestore } from "../App";
import { FOCUS_LOCATION } from "./actionTypes";

// prettier-ignore
const fcmTokenRequest = () => ({ type: actionTypes.FETCH_FCM_TOKEN, fetching: true });
const fcmTokenSuccess = token => ({ type: actionTypes.FETCH_FCM_TOKEN, token });
const fcmTokenFailure = error => ({ type: actionTypes.FETCH_FCM_TOKEN, error });

/**
 * Get the Firebase Clud Messaging token, that we'll use to identify the user by.
 * Also set a listener to update token should it change.
 * @returns {Function}
 */
export const fetchFCMToken = () => async (dispatch, getState) => {
  if (getState().app.fcmToken.token) {
    console.log("FCM token already stored. Will not fetchFCMToken");
    return;
  }

  dispatch(fcmTokenRequest());

  try {
    const token = await firebase.messaging().getToken();
    dispatch(fcmTokenSuccess(token));
  } catch (error) {
    dispatch(fcmTokenFailure(error.message));
  }

  this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
    dispatch(fcmTokenSuccess(token));
  });
};

const userRequest = () => ({ type: actionTypes.FETCH_USER, fetching: true });
const userSuccess = data => ({ type: actionTypes.FETCH_USER, data });
const userFailure = error => ({ type: actionTypes.FETCH_USER, error });

/**
 * Retrieve any existing user data associated with the FCM token
 * @returns {Function}
 */
export const fetchUser = () => async (dispatch, getState) => {
  const fcmToken = getState().app.fcmToken.token;
  if (!fcmToken) {
    console.log("No FCM token. Will not fetchUser");
    return;
  }

  dispatch(userRequest());
  try {
    const userQuery = await db
      .collection("users")
      .doc(fcmToken)
      .get();

    let data = false;
    if (userQuery.exists) {
      data = userQuery.data();
    }
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFailure(error.message));
  }
};

const planningAppsRequest = () => ({
  type: actionTypes.FETCH_PLANNING_APPS,
  fetching: true
});
const planningAppsSuccess = data => ({
  type: actionTypes.FETCH_PLANNING_APPS,
  data
});
const planningAppsFailure = error => ({
  type: actionTypes.FETCH_PLANNING_APPS,
  error
});

/**
 * Save user location to Firestore and update state
 * @param location
 * @returns {Function}
 */
export const setUserLocation = location => async (dispatch, getState) => {
  const fcmToken = getState().app.fcmToken.token;

  const user = {
    location,
    searchRadius: 5 // default
  };

  dispatch(userRequest());

  db.collection("users")
    .doc(fcmToken)
    .set(user)
    .then(() => {
      dispatch(userSuccess(user));
    })
    .catch(error => {
      dispatch(userFailure(error.message));
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
  dispatch(planningAppsRequest());
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

    let data = [];
    results.forEach(doc => data.push(doc.data()));

    dispatch(planningAppsSuccess(data));
  } catch (error) {
    dispatch(planningAppsFailure(error.message));
  }
};

export const setFocusedLocation = index => ({ type: FOCUS_LOCATION, index });
