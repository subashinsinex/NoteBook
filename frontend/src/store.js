import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  notesCreateReducer,
  notesListReducer,
  notesDeleteReducer,
  notesUpdateReducer,
} from "./reducers/notesReducers";

// Combine all reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  notesList: notesListReducer,
  notesCreate: notesCreateReducer,
  notesDelete: notesDeleteReducer,
  notesUpdate: notesUpdateReducer,
});

// Fetch user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Set initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Apply middleware
const middleware = [thunk];

// Create store with middleware and devtools
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
