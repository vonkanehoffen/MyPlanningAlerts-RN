import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutable";
import thunk from "redux-thunk";
import { fromJS } from "immutable";
import fcmToken from "./reducers/fcmToken";
import planningApps from "./reducers/planningApps";
import user from "./reducers/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleWare = store => next => action => {
  console.log("Redux Action:", action);
  // console.log("Redux Store:", store.getState());
  next(action);
};

const rootReducer = combineReducers({
  fcmToken,
  user,
  planningApps
});

const initialState = {};

const store = createStore(
  rootReducer,
  fromJS(initialState),
  composeEnhancers(applyMiddleware(thunk, loggerMiddleWare))
);

export default store;
